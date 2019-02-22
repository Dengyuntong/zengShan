require(['/js/config.js'], function () {
	require(['mui'], function () {
		var id = window.location.search.slice(1).split('=')[1];
		init()
		//初始化   查询出用户查询的数据
		function init () {
			mui.ajax('/detail', {
				dateType: 'json',
				type: 'post',
				headers:{'Content-Type':'application/json'}	,
				data: {
					id:id
				},
				success: function (data) {
					if(data.code == 1) {
						var html = ``;
						data.message.forEach(function (el, i) {
							html += `
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:;">
									<div class="mui-pull-left">姓名</div>
									<p class='mui-ellipsis mui-pull-right'>${el.name}</p>
								</a>
							</li>
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:;">
									<div class="mui-pull-left">年龄</div>
									<p class='mui-ellipsis mui-pull-right'>${el.age}</p>
								</a>
							</li>
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:;">
									<div class="mui-pull-left">地址</div>
									<p class='mui-ellipsis mui-pull-right'>${el.site}</p>
								</a>
							</li>
							<li class="mui-table-view-cell mui-media">
								<a href="javascript:;">
									<div class="mui-pull-left">身份证号</div>
									<p class='mui-ellipsis mui-pull-right'>${el.idnumber}</p>
								</a>
							</li>
							<button type="button" class="mui-btn mui-btn-primary">修改</button>
							`
						})
						var uli = document.querySelector('.mui-table-view');
						uli.innerHTML = html
					}
					click(data)
				}
			})
		}
		//点击修改事件
		function click (data) {
			var btn = document.querySelector('.mui-btn-primary');
			btn.onclick = function () {
				var htmls = ``;
				data.message.forEach(function (el, i) {
					htmls += `<form class="mui-input-group">
						<div class="mui-input-row">
							<label>姓名</label>
							<input type="text" class="mui-input-clear" value="${el.name}">
						</div>
						<div class="mui-input-row">
							<label>年龄</label>
							<input type="text" class="mui-input-clear" value="${el.age}">
						</div>
						<div class="mui-input-row">
							<label>地址</label>
							<input type="text" class="mui-input-clear" value="${el.site}">
						</div>
						<div class="mui-input-row">
							<label>身份证号</label>
							<input type="text" class="mui-input-clear" value="${el.idnumber}">
						</div>
						<div class="mui-button-row">
							<button type="button" class="mui-btn mui-btn-primary" >确认</button>
							<button type="button" class="mui-btn mui-btn-danger" >取消</button>
						</div>
					</form>`
				})
				var uli = document.querySelector('.mui-table-view');
				uli.innerHTML = htmls
				save ()
			}
		}
		//修改后 保存按钮事件
		function save () {
			var xiu = Array.from(document.querySelectorAll('.mui-input-clear')),
				xur = document.querySelector('.mui-btn-primary');
			xur.onclick = function () {
				var obj = {
					"name": xiu[0].value,
					"age": xiu[1].value,
					"site": xiu[2].value,
					"idnumber": xiu[3].value,
					"id": id
				};
				mui.ajax('/insert', {
					dataType:'json',
					type:'post',
					headers:{'Content-Type':'application/json'},
					data:obj,
					success: function (data) {
						if(!data.code == 1){
							alert(data.message)
						} else {
							alert(data.message)
							window.location.href = '../index.html'
						}
					}
				})
			}
		}
	})
})