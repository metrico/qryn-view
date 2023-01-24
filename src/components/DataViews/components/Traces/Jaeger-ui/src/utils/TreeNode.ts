// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export default class TreeNode {


  value:any 
  children:any
  static iterFunction(fn:any, depth:any = 0) {
    return (node:any) => fn(node.value, node, depth);
  }

  static searchFunction(search:any) {
    if (typeof search === 'function') {
      return search;
    }

    return (value:any, node:any) => (search instanceof TreeNode ? node === search : value === search);
  }

  constructor(value:any, children:any = []) {
    this.value = value;
    this.children = children;
  }

  get depth() {
    return this.children.reduce((depth:any, child:any) => Math.max(child.depth + 1, depth), 1);
  }

  get size() {
    let i = 0;
    this.walk(() => i++);
    return i;
  }

  addChild(child:any) {
    this.children.push(child instanceof TreeNode ? child : new TreeNode(child));
    return this;
  }

  find(search:any) {
    const searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search));
    if (searchFn(this)) {
      return this;
    }
    for (let i = 0; i < this.children.length; i++) {
      const result = this.children[i].find(search);
      if (result) {
        return result;
      }
    }
    return null;
  }

  getPath(search:any) {
    const searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search));

    const findPath:any = (currentNode:any, currentPath:any) => {
      // skip if we already found the result
      const attempt = currentPath.concat([currentNode]);
      // base case: return the array when there is a match
      if (searchFn(currentNode)) {
        return attempt;
      }
      for (let i = 0; i < currentNode.children.length; i++) {
        const child = currentNode.children[i];
        const match = findPath(child, attempt);
        if (match) {
          return match;
        }
      }
      return null;
    };

    return findPath(this, []);
  }

  walk(fn:any, depth:any = 0) {
    const nodeStack:any = [];
    let actualDepth = depth;
    nodeStack.push({ node: this, depth: actualDepth });
    while (nodeStack.length) {
      const { node, depth: nodeDepth } = nodeStack.pop();
      fn(node.value, node, nodeDepth);
      actualDepth = nodeDepth + 1;
      let i = node.children.length - 1;
      while (i >= 0) {
        nodeStack.push({ node: node.children[i], depth: actualDepth });
        i--;
      }
    }
  }
}
