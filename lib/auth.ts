export const getUserRole = () => {
  // Replace with real auth logic later
  return 'boss' // or 'executive' or 'viewer'
}

export const hasAccess = (role: string, page: string) => {
  const accessMap: Record<string, string[]> = {
    boss: ['boss', 'digest', 'tools'],
    executive: ['digest', 'tools'],
    viewer: ['digest'],
  }
  return accessMap[role]?.includes(page)
}