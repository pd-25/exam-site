export interface MenuItem {
  id: string
  name: string
  href: string
  parent_id: string | null
  children?: MenuItem[]
}

interface OrganizeItemsFunction {
  (items: MenuItem[]): MenuItem[]
}

export const organizeItems: OrganizeItemsFunction = (items) => {
  const itemMap: { [key: string]: MenuItem } = {}
  const roots: MenuItem[] = []

  // Initialize map with items and an empty children array
  items.forEach((item) => {
    itemMap[item.id] = { ...item, children: [] }
  })

  // Populate children or identify roots, with added checks
  items.forEach((item) => {
    if (item.parent_id) {
      if (itemMap[item.parent_id]) {
        // Check if parent exists in the map
        itemMap[item.parent_id].children!.push(itemMap[item.id])
      } else {
        console.warn(
          `Parent ID ${item.parent_id} for item ID ${item.id} not found.`
        )
      }
    } else {
      roots.push(itemMap[item.id])
    }
  })

  return roots
}
