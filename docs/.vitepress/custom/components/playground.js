import { createVNode, render } from 'vue'
import ExampleRepl from './exampleRepl.vue'

let vm
export default function playground (codeName) {
  console.log('codeName', codeName)
  if (vm) {
    vm.component.exposed.handleShow(true)
    vm.component.props.codeName = codeName
    return vm
  }
  const container = document.createElement('div')
  vm = createVNode(ExampleRepl, {
    codeName
  })
  render(vm, container)

  document.body.appendChild(container)
  return vm
}
