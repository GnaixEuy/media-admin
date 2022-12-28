<template>
    <div id="app">
        <img alt="Vue logo" style="width: 20%;" src="../assets/logo.png">
        <br />
        <div class="hello">
            <h1>{{ msg }}</h1>
            <p>
                tiktik 管理员后台 / 第一阶段,<br>
                整体项目参见
                <a href="https://github/GnaixEuy" target="_blank" rel="noopener">github</a>.
            </p>
            <h3>目前已托管项目</h3>
            <ul>
                <li><a href="https://github.com/GnaixEuy/media-platform" target="_blank" rel="noopener">后端</a></li>
                <li><a href="https://github.com/GnaixEuy/media-user-client" target="_blank" rel="noopener">客户端</a></li>
            </ul>
            <h3>技术选型</h3>
            <ul>
                <li><a href="https://vuejs.org" target="_blank" rel="noopener">未完成</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    data() {
        return {
            msg: 'tiktik'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #ad90da;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
