'use strict'
import VElement from './VElement';

const vdom = velement('div', { 'id': 'container' }, [
  velement('h1', { style: 'color:red' }, ['simple virtual dom']),
  velement('p', ['hello world']),
  velement('ul', [velement('li', ['item #1']), velement('li', ['item #2'])]),
]);
var rootnode = vdom.render();
document.body.appendChild(rootnode);


