<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
 //import $ from 'jquery'

export default {
  components: {
    NavBar
  },
  setup(){
   // 测试LoginService
    //   $.ajax({
    //    url: "http://127.0.0.1:3000/user/account/token/",
    //    type: "post",
    //    data: {
    //      username: "nonfire",
    //      password: "309223",
    //    },
    //    success(resp) {
    //      console.log(resp);
    //    },
    //    error(resp) {
    //      console.log(resp);
    //    },
    //  });

    //  $.ajax({
    //    url: "http://127.0.0.1:3000/user/account/info/",
    //    type: "get",
    //    headers: { // 该链接后台需要授权，则要加上标头
    //      Authorization:
    //        "Bearer " +
    //        "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzZjUxOWIyM2M5YTM0YTZhYTRlZGIyYTI5MmJlN2Y3NSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2MzMzMDk0NCwiZXhwIjoxNjY0NTQwNTQ0fQ.IdXCCK6f7l753vfYW7U8jiZbDj8pdtnHib8A6_Nmh7Y",
    //    },
    //    success(resp) {
    //      console.log(resp);
    //    },
    //    error(resp) {
    //      console.log(resp);
    //    },
    //  });
    //  $.ajax({
    //    url: "http://127.0.0.1:3000/user/account/register/",
    //    type: "post",
    //    data: {
    //      username: "szs2",
    //      password: "123",
    //      confirmedPassword: "123",
    //    },
    //    success(resp) {
    //      console.log(resp);
    //    },
    //    error(resp) {
    //      console.log(resp);
    //    },
    //  });

  }
}

</script>


<style>
  body {
  background-image: url("./assets/images/background.jpeg");
  background-size: cover;
}
</style>
