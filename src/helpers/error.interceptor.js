
const errorInterceptor = (axiosInstance) => {
axiosInstance.interceptors.response.use((response) => {
  //Response Successful
},(error) => {
   if (error?.status?.code === 401) {
     //Unauthorized
     //redirect to Login
   } else {
       console.error("TEST")
    //dispatch your error in a more user friendly manner
      if (true) {
      //easier debugging
      console.group("Error");
      console.log(error);
      console.groupEnd();
     }
  }
});
};
export default errorInterceptor;