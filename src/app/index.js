import { useState } from 'react'
import GGEditor, { Flow } from 'gg-editor'
import { Dropdown } from './Dropdown'
// import './style/style.css'

// RegExp for parsing string
const regExp = /([>&;])+/g

const App = () => {
  //[STATE]
  const [visibility, setVisibility] = useState(true)
  const [filterInputData, setFilterInputData] = useState('')
  const [fullInputString, setFullInputString] = useState('')
  //const [schemeData, setSchemeData] = useState()
  //[ADDITIONAL_HOOKS]

  //[COMPUTED_PROPERTIES]
  let [x, y] = [50, 50]
  let data = {
    nodes: [],
    edges: []
  }

  //add new var for simplifying use
  let InputString = ''
  //[HELPER_FUNCTIONS]
  const onChange = ({ target }) => {
    InputString = target.value
    //when our string include our specific symbols from regExp Const
    if (InputString.match(regExp)) {
      //set state to show our menu-dropdown component
      setVisibility(true)

      //searching for the last index of specific symbol
      const [arrowLastIndex, andLastIndex, semicolonLastIndex] = [
        InputString.lastIndexOf('>'),
        InputString.lastIndexOf('&'),
        InputString.lastIndexOf(';')
      ]
      /*searching max value of index to slice our input value from last specific symbol till the last entered symbol.
        This is to compare the input value with the value of the dropdown-list */
      const sliceIndex = Math.max(
        arrowLastIndex,
        andLastIndex,
        semicolonLastIndex
      )
      //slice our input value for dropdown filtration
      setFilterInputData(InputString.slice(sliceIndex + 1))
      //slice our input value for case when u click on dropdown item and we should to replace part of word on dropdown item text
      setFullInputString(InputString.slice(0, sliceIndex + 1))
    } else {
      //when input string doesn`t include specific symbols
      setFilterInputData(InputString)
      setFullInputString('')
    }
  }

  const onHandleFinish = async () => {
    //Get array divided on array elements where 1 element - Page and where we can go from this page
    const mainArray = document.getElementById('input').value.split(';')
    //Divide our array on subarrays, where first element always source, other elements - targets
    const subArray = mainArray.map((subArray) => subArray.split(/[>&]/))
    //Let we loop with our subArray
    for (let i = 0; i < subArray.length; i++) {
      //when there is no data, we skip the iteration
      if (!subArray[i][0]) continue
      for (let j = 0; j < subArray[i].length; j++) {
        //when there is no data, we skip the iteration
        if (!subArray[i][j]) continue
        //Getting all nodes labels from data.nodes and check if current node already exist in our data.nodes field
        let nodesLabel = data.nodes?.map((node) => node.label)

        !nodesLabel.includes(subArray[i][j]) &&
          subArray[i][j].length > 0 &&
          data.nodes.push({ id: subArray[i][j], label: subArray[i][j] })
        /*As first element of sub array always sourse for edges, 
        and to get correct name of targets,
         we should always start from second element of subarray*/
        if (j > 0) {
          let currentEdgeSource = subArray[i][0]
          let currentEdgeTarget = subArray[i][j]
          //add bool var to check if edge exist in data edges
          let isEdgeAlreadyExist = data.edges.some(
            (edge) =>
              edge.source === currentEdgeSource &&
              edge.target === currentEdgeTarget
          )

          !isEdgeAlreadyExist &&
            data.edges.push({
              source: subArray[i][0],
              target: subArray[i][j]
            })
        }
      }
    }
    //check in the console data that we received
    console.log('data', data)
    //setSchemeData(data)
  }

  const onListItemClick = ({ target }) => {
    //concate input string(from start to last specific symbol) with clicked Item
    const newString = fullInputString + target.innerText
    //set to input this value
    document.getElementById('input').value = newString
    //set new value to state
    setFullInputString(newString)
    //hide dropdown-list
    setVisibility(false)
  }

  //[TEMPLATE]
  return (
    <>
      <div style={{ paddingBottom: '20px' }}>
        <input
          type="text"
          onChange={onChange}
          id="input"
          style={{ width: '60%' }}
        />
        <button
          onClick={onHandleFinish}
          style={{
            backgroundColor: 'lightgreen',
            cursor: 'pointer'
          }}>
          Generate routes structure
        </button>
        <Dropdown
          filterInputData={filterInputData}
          onListItemClick={onListItemClick}
          visibility={visibility}
        />
      </div>
      {/* {schemeData && (
        <GGEditor className="editor">
          <Flow
            className="editorBd"
            data={schemeData}
            graphConfig={{
              defaultNode: {
                shape: 'bizFlowNode'
              },
              defaultEdge: {
                shape: 'bizFlowEdge'
              }
            }}
          />
        </GGEditor>
      )} */}
    </>
  )
}

export default App
