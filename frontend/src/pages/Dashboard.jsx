function Dashboard(){

  const user_name = localStorage.getItem("user_name");

  return(

    <div style={{textAlign:"center", marginTop:"100px"}}>

      <h1>Dashboard</h1>

      <p>User Name: {user_name}</p>

      <button>
        Create Profile
      </button>

    </div>

  );

}

export default Dashboard;