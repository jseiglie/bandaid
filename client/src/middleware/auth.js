
const auth = {}

auth.check = async ()=> {
  try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token found')
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          }
      })
  
      if (!response.ok) {
        localStorage.removeItem('token')
        throw new Error('Token is not valid')
      }
      return true
      
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}
export default auth