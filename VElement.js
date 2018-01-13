const setArr = require('./utils').setArr;

function VElement(tagName, props, children) {
  if (!(this instanceof VElement)) {
    return new VElement(tagName, props, children);
  }

  if (Array.isArray(props)) {
    children = props;
    props = {};
  }

  this.tagName = tagName;
  this.props = props;
  this.children = children || [];
  this.key = props ? props.key : void 0;
  let count = 0; // 记录后代节点数
  this.children.forEach((child, index) => {
    if (child instanceof VElement) {
      count += child.count;
    } else {
      children[index] = '' + child;
    }
    count++;
  });
  this.count = count;
}

// 根据虚拟节点构建真是节点
VElement.prototype.render = function() {
  // 创建标签
  const el = document.createElement(this.tagName);

  // 设置标签属性
  Object.keys(this.props).forEach(function(propName) {
    const propValue = props[propName];
    setArr(el, propName, propValue);
  });

  // 创建子节点
  this.children.forEach((child) => {
    const childElement = child instanceof VElement ? child.render() : document.createTextNode(child);
    el.appendChild(childElement);
  });

  return el;
};

module.exports = VElement;