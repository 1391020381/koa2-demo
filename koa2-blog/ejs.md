# ejs
1. <% code %>用于执行其中js代码 <% alert('hello,world') %>  注意<% code %>的格式对应
2. <%= code %>会对code进行html转义
3. <%- code %>将不会进行转义。
4. 利用 <%- include filename %> 加载其他页面模板
5. [ejs](https://github.com/mde/ejs)
6. includes
   * <ul>
       <% users.forEach(function(user){ %>
         <%- include('user/show', {user: user}); %>
       <% }); %>
     </ul>
7. 注意前后端的分离和功能的联系     