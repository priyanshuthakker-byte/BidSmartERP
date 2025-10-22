export const getUserRole = () => {
  return 'boss' // or 'executive'
}

export const hasAccess = (role: string, page: string) => {
  const accessMap: Record<string, string[]> = {
    boss: ['boss', 'digest', 'tools'],
    executive: ['digest', 'tools'],
  }
  return accessMap[role]?.includes(page)
}