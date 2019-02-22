require(['/js/config.js'], function() {
    require(['mui'], function(mui) {
        var page = 1,
            pageSize = 12,
            count = 0;
        init() //初始化
        dels() //删除
        finde() //查看详情
        inser() //添加信息

        function ajax() {
            mui.ajax('/find', {
                dataType: 'json',
                type: 'get',
                data: {
                    "page": page,
                    "pageSize": pageSize
                },
                success: function(ev) {
                    console.log(ev)
                    if (ev.code) {
                        var html = ``;
                        ev.message.forEach(function(el, i) {
                            html += `
							<li class="mui-table-view-cell" data-id="${el._id}">
								${el.name}
								<div class="btns">
									<button type="button" class="mui-btn mui-btn-primary">查看详情</button>
									<button type="button" class="mui-btn mui-btn-danger">删除</button>
								</div>
							</li>
							`;
                        })
                        var lis = document.querySelector('#box');
                        lis.innerHTML += html
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
                    }
                }
            })
        }

        function init() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

            mui.init({ //上拉加载初始化
                pullRefresh: {
                    container: '#pullrefresh',
                    up: {
                        auto: true,
                        contentrefresh: '正在加载...',
                        callback: pullupRefresh
                    }
                }
            });

            function pullupRefresh() {
                ajax()
                page++
            }
        }

        function dels() { //删除
            mui('.mui-table-view').on('tap', '.mui-btn-danger', function() {
                var lie = this.parentNode.parentNode;
                var id = lie.dataset.id;
                var btnArray = ['否', '是'];
                mui.confirm('是否要删除这条信息？', '删除', btnArray, function(e) {
                    if (e.index == 1) {
                        mui.ajax('/remove', {
                            dataType: 'json',
                            type: 'post',
                            data: {
                                id: id
                            },
                            success: function(data) {
                                if (data.code == 1) {
                                    window.document.querySelector('.mui-table-view').removeChild(lie)
                                }
                            }
                        })
                    }
                })
            })
        }

        function finde() { //查看详情
            mui('.mui-table-view').on('tap', '.mui-btn-primary', function() {
                var id = this.parentNode.parentNode.dataset.id
                console.log(id)
                window.location.href = './page/detail.html?id=' + id
            })
        }

        function inser() { //点击添加按钮
            var ins = document.querySelector('#inser');
            ins.onclick = function() {
                window.location.href = "./page/insert.html"
            }
        }
    })
})