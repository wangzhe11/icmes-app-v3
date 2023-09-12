// 根据父子id关系将列表组织为树结构
export function listToTreeAsParentId<T = any>(list: any[]): T[] {
  const nodeMap = new Map();
  const result: T[] = [];

  for (const node of list) {
    node.children = node.children || [];
    nodeMap.set(node.id, node);
  }
  for (const node of list) {
    const parent = nodeMap.get(node['parentId']);
    (parent ? parent.children : result).push(node);
  }
  return result;
}
