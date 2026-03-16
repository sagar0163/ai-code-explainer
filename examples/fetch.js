// Example: Fetch API usage
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// Usage
fetchUserData(123).then(user => {
  if (user) {
    console.log(`Hello, ${user.name}!`);
  }
});
