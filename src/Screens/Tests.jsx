import { useEffect, useRef, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import PropTypes from 'prop-types'
import api from '../services/api'
// import PropTypes from 'prop-types'; 

const Tests = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [activeTests, setActiveTests] = useState([]);
  const [backlogTests, setBacklogTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setIsRefreshing(true);
        const response = await api.getAllData();
        const { data } = response;
        const active = data.filter(test => test.uri && test.uri.length > 0 && (test.testStatus == 'active' || test.testStatus == null));
        // const backlog = data.filter(test => !test.uri || test.uri.length === 0 || test.testStatus == 'backlog' || test.testStatus==null);
        const backlog = data.filter(test => test.testStatus == 'backlog' || test.testStatus==null);
        const completed = data.filter(test => test.testStatus == 'completed');
        setActiveTests(active);
        setBacklogTests(backlog);
        setCompletedTests(completed);
      } catch (error) {
        console.error('Error fetching tests:', error);
      } finally {
        setIsRefreshing(false); // Reset refreshing state after fetching
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="flex-grow p-4">
      <Tabs>
        <TabList className={`flex`}>
          <Tab className={`mr-2 py-2 px-4 cursor-pointer rounded-t-lg ${activeTab === 'active' ? 'bg-blue-500 text-white' : 'bg-slate-400'}`} onClick={() => setActiveTab('active')}>Active Tests</Tab>
          <Tab className={`mr-2 py-2 px-4 cursor-pointer rounded-t-lg ${activeTab === 'backlog' ? 'bg-blue-500 text-white' : 'bg-slate-400'}`} onClick={() => setActiveTab('backlog') } >Backlog Tests</Tab>
          <Tab className={`mr-2 py-2 px-4 cursor-pointer rounded-t-lg ${activeTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-slate-400'}`} onClick={() => setActiveTab('completed') } >Completed Tests</Tab>
        </TabList>

        <TabPanel>
          <TestListTab tests={activeTests} type="Active Tests" />
        </TabPanel>
        <TabPanel>
          <TestListTab tests={backlogTests} type="Backlog Tests" />
        </TabPanel>
        <TabPanel>
          <TestListTab tests={completedTests} type="Completed Tests" />
        </TabPanel>
      </Tabs>
    </div>
  );
}

function TagCreate({ tags }){
    return (
      <div className="flex flex-wrap gap-2">
        {tags!=null && tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-500 font-semibold px-1 py-0.5 rounded-md text-xs"
          >
            {tag.toLowerCase()}
          </span>
        ))}
      </div>
    );
  };

function TestListTab({ tests, type }) {
  const [showIframe, setShowIframe] = useState(false);
  
  const [showIframeTimer, setShowIframeTimer] = useState({});
  const [timers, setTimers] = useState({});
  const [isPaused, setIsPaused] = useState({});
  const [isStarted, setIsStarted] = useState({});
  const [isSubmitted, setIsSubmitted] = useState({});
  const intervalRef = useRef(null);
  TestListTab.propTypes = {
    tests: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        uri: PropTypes.string,
        duration: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        uploadDate: PropTypes.string,
      })
    ).isRequired,
    type: PropTypes.string.isRequired,
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimers = {};
      for (const testId in timers) {
        if (timers[testId] > 0 && isStarted[testId] && !isPaused[testId] && !isSubmitted[testId]) {
          updatedTimers[testId] = timers[testId] - 1;
        } else {
          updatedTimers[testId] = timers[testId];
        }
      }
      setTimers(updatedTimers);
    }, 1000);

    intervalRef.current = intervalId;

    return () => clearInterval(intervalId);
  }, [timers, isPaused, isStarted]); 

  const startTestTimer = (testId, duration, url) => {
    if (isStarted[testId] && !isSubmitted[testId]){
      api.updateTestStatus(testId, "completed");
      <Tests />
    }
    if(isStarted[testId]){
      setIsSubmitted({...isSubmitted, [testId]: true})
    } else {      
      window.open(url.replace(/view\?/g, 'preview?'), '_blank')
      setTimers({ ...timers, [testId]: 60 * duration }); // Set timer to 60 minutes
      setIsPaused({ ...isPaused, [testId]: false });
      setIsStarted({ ...isStarted, [testId]: true });
      setShowIframeTimer({ ...showIframeTimer, [testId]: !showIframeTimer[testId] });
    }
  };

  const pauseTestTimer = (testId) => {
    if(isPaused[testId])
      togglePause(testId)
    else
      setIsPaused({ ...isPaused, [testId]: true });
  };

  const togglePause = (testId) => {
    setIsPaused({ ...isPaused, [testId]: !isPaused[testId] });
  };


  return (  
    <div className="p-4 border-blue-500 border-4 rounded-b-md rounded-r-md">
      <h2 className="text-lg font-semibold mb-4">{type}</h2>
      <ul className="space-y-4">
        {tests.map((test) => (
          <li key={test.id} className="border border-gray-200 rounded-md p-4">
            <div className="flex flex-row justify-between">
              <h3 className="text-lg font-semibold">{test.name}</h3>
              {test.testStatus == 'active' && <h5 className="text-sm content-center">Test Expires On : {new Date(test.testExpiry).toLocaleString()}</h5>}
            </div>
            <TagCreate tags={test.tags}/>
            {/* <p>Tags: {test.tags.join(', ')}</p> */}
            {/* <button onClick={() => setShowIframe(!showIframe)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded"> 
              setShowIframe(!showIframe)}>
               && window.open(test.uri.replace(/view\?/g, 'preview?'), '_blank')
              {showIframe ? "Hide Preview" : "View Preview"}
            </button>
            {showIframe && test.uri && test.uri.length > 0 && (
              <iframe
                src={test.uri.replace(/view\?/g, 'preview?')}
                title={test.name}
                width="100%"
                height="400px"
              />
            )} */}
            <button
              onClick={() => setShowIframe({ ...showIframe, [test.id]: !showIframe[test.id] })}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded">
              {showIframe[test.id] ? "Hide Preview" : "View Preview"}
            </button>
            {test.testStatus == 'active' && <button
              onClick={() => { startTestTimer(test.id, test.duration, test.uri) }}
              className={`mt-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded ${timers[test.id] && isStarted[test.id] ? 'bg-green-500 hover:bg-green-700' : ''}`}>
              {isSubmitted[test.id] ? "Completed" : timers[test.id] && isStarted[test.id] ? "Submit Test" : "Start Test"}
            </button>}
            
            {isStarted[test.id] && !isSubmitted[test.id] &&
                <button
                  onClick={() => pauseTestTimer(test.id)}
                  className={`mt-2 ml-2 text-white text-sm font-bold py-1 px-2 rounded ${timers[test.id] && isPaused[test.id] ? 'bg-slate-500 hover:bg-slate-700' : 'bg-red-500 hover:bg-red-700'}`}>
                  {timers[test.id] && isPaused[test.id] ? "Resume Test" : "Pause Test"}
                </button>
            }
            {timers[test.id] && (
              <span className="ml-2 text-sm font-semibold">
                {Math.floor(timers[test.id] / 60)}:{Math.floor(timers[test.id] % 60).toString().padStart(2, '0')}
              </span>
            )}
            {showIframe[test.id] && test.uri && test.uri.length > 0 && (
              <iframe
                src={test.uri.replace(/view\?/g, 'preview?')}
                title={test.name}
                width="100%"
                height="400px"
              />
            )}
            {showIframe && (!test.uri || test.uri.length === 0) && (
              <p>No URL available</p>
            )}
          </li>
        ))}
      </ul>
      {tests.length == 0 && <p>No Data available</p>}
    </div>
  );
}

export default Tests