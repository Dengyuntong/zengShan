require(['../js/config.js'], function () {
	require(['mui'], function (mui) {
		save ()
		function save () {
			var xiu = Array.from(document.querySelectorAll('.mui-input-clear')),
				xur = document.querySelector('.mui-btn-primary');
			xur.onclick = function () {
				var obj = {
					"name": xiu[0].value,
					"age": xiu[1].value,
					"site": xiu[2].value,
					"idnumber": xiu[3].value
				};
				mui.ajax('/insert', {
					dataType:'json',
					type:'post',
					headers:{'Content-Type':'application/json'},
					data:obj,
					success: function (data) {
						if(data.code == 1){
							alert(data.message)
							window.location.href = '../index.html'
						} else {
							alert(data.message)
						}
					}
				})
			}
		}
	})
})