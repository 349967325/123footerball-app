<template>
	<div class="bespeak">
		<div class="form-area">
			<h3 class="title">
				<span>体验课预约</span>
			</h3>
			<div class="form-content">
				<div class="form-item">
				    <p class="form-info clearfix"> 
				        <label>姓名</label>
					    <input type="text" v-model.trim="studentName" name="Realname" placeholder="请输入孩子的姓名">
					</p>  
				</div>
				<div class="form-item">
				    <p class="form-info clearfix"> 
				        <label>性别</label>
					    <select name="Sex" v-model="sex">
					    	<option value="" selected="true" disabled="true">请选择孩子的性别</option>
					    	<option value="男">男</option>
					    	<option value="女">女</option>
					    </select>
					</p> 
				</div>
				<div class="form-item">
				    <p class="form-info clearfix">
				        <label>年龄</label>
					    <select name="Age" v-model="age">
					    	<option value="" selected="true" disabled="true">请选择孩子的年龄</option>
					    	<option value="4">4周岁</option>
					    	<option value="5">5周岁</option>
					    	<option value="6">6周岁</option>
					    	<option value="7">7周岁</option>
					    	<option value="8">8周岁</option>
					    	<option value="9">9周岁</option>
					    	<option value="10">10周岁</option>
					    	<option value="11">11周岁</option>
					    	<option value="12">12周岁</option>
					    	<option value="13">13周岁</option>
					    	<option value="14">14周岁</option>
					    	<option value="15">15周岁</option>
					    </select>
					</p>
				</div>
				<div class="form-item">
				    <p class="form-info clearfix">
				        <label>家长手机号</label>
					    <input type="number" v-model.trim="phone" name="Mobile" placeholder="请输入家长手机号">
					</p>
				</div>
				<div class="form-item">
				    <p class="form-info clearfix">
				        <label>体验校区</label>
					    <select name="Campus" v-model="Campus">
					    	<option value="" selected="true" disabled="true">请选择体验校区</option>
					    	<option v-for="item in addList" :value="item.center_address">{{item.center_address}}</option>
					    </select>
					</p>  
				</div>
			</div>
			<div class="btn-wrap">
				<a class="btn" @click="postSubmit">立即预约</a>
			</div>
		</div>	
	</div>
</template>

<script type="ecamscript-6">
import Vue from 'vue'
import { Toast } from 'vant';

Vue.use(Toast);

	export default {
		mounted () {
			this.$http.post("http://club.123zuqiu.cn/football/front/getAddressList", {}).then((response) => {
				response = response.body;
				if (response.code == 0) {
					this.addList = response.data.list;
				}
			})
		},
		data () {
			return {
				addList: [],
                studentName: '',
				phone: '',
				Campus: '',
                sex: '',
				age: ''
			}
		},
		methods: {
            postSubmit () {
            	let postdata = {};

            	if (this.studentName == "" || this.sex == "" || this.age == "" || this.phone == "" ||this.Campus == "") {
					Toast("请完善您的信息")
					return;
				} 
               
                let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
                if (!myreg.test(this.phone)) {  
					Toast("请正确填写您的手机号");
					return 
                }
			    
				postdata.childName = this.studentName;
				postdata.childSex = this.sex;
				postdata.age = this.age;
				postdata.mobile = this.phone;
				postdata.nearCenterAddress = this.Campus;
				
				this.$http.post("http://club.123zuqiu.cn/football/front/addExperienceUser", postdata).then((response) => {
                    response = response.body;
				    if (response.code == 0) {
                        this.studentName = '';
					    this.sex = '';
					    this.age = '';
					    this.phone = '';
					    Toast("请等待工作人员给您沟通，进行确认", "信息提交成功")
				    } else {
				    	Toast(response.msg)
				    }
				}, (response) => {
					Toast("请求服务器错误，请稍后再试");
				});
            }
		}
	}
</script>


<style lang="scss" rel="stylesheet">
@import "../common/scss/form.scss";
</style>