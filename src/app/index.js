import GGEditor, { Flow, EditableLabel } from "gg-editor";

const data = {
  nodes: [
    {
      id: "0",
      label: "Node",
      x: 55,
      y: 55
    },
    {
      id: "1",
      label: "Node",
      x: 55,
      y: 255
    },
    { id: "2", label: "Node", x: 205, y: 255 }
  ],
  edges: [
    {
      label: "Label",
      source: "0",
      target: "1"
    },
    { label: "Label", source: "0", target: "2" }
  ]
}

function App() {
  return (
    <GGEditor className="editor">
      <Flow
        className="editorBd"
        data={data}
        graphConfig={{
          defaultNode: {
            shape: "bizFlowNode"
          },
          defaultEdge: {
            shape: "bizFlowEdge"
          }
        }}
      />
      <EditableLabel />
    </GGEditor>
  )
}

export default App;
