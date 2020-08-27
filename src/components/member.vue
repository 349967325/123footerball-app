<template>
	<div class="member">
	    <div class="form-area" id="joinForm">
			<h3 class="title">
				<span>入会信息</span>
			</h3>
			<div class="form-content">
			    <!--姓名-->
				<div class="form-item">
                    <p class="form-info clearfix">
				        <label>姓名</label>
					    <input type="text" v-model.trim="studentName" name="studentName" placeholder="请输入孩子姓名">
                    </p>
              
				</div>

                <div class="form-item">
                    <p class="form-info clearfix">
                        <label>手机号</label>
                        <input type="number" v-model.trim="phone" name="phone" placeholder="请输入家长手机号">
                    </p>
                    
                </div>

				<!--性别-->
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

                <!--证件类型-->
                <div class="form-item">
                    <p class="form-info clearfix"> 
                        <label>证件类型</label>
                	    <select name="CardType">
					    	<option value="" selected="true" disabled="true">请选择证件类型</option>
					    	<option value="身份证">身份证</option>
					    	<option value="护照">护照</option>
					    </select>
                    </p>    
                    
                </div>

                <!--证件号-->
                <div class="form-item">
                    <p class="form-info clearfix"> 
                        <label>证件编号</label>
					    <input type="text" v-model.trim="idCard" name="CardId" placeholder="请输入证件编号">
                    </p>
                    
				</div>

                <!--身高-->
                <div class="form-item">
                    <p class="form-info clearfix"> 
                        <label>身高(cm)</label>
                	    <input type="number" v-model.trim="height" name="Height" id="Height" placeholder="请输入孩子身高">
                    </p>   
                    
                </div>

                <!--体重-->
                <div class="form-item">
                    <p class="form-info clearfix"> 
                        <label>体重(kg)</label>
                	    <input type="number" v-model.trim="weight" name="Weight" id="Weight" placeholder="请输入孩子体重">
                    </p>    
                    
                </div>

                <!--衣服尺码-->
                <div class="form-item">
                    <p class="form-info clearfix"> 
                        <label>衣服尺码</label>
                	    <select name="ClothesSize" v-model="chothingSize" id="ClothesSize">
					    	<option value="" selected="true" disabled="true">请选择衣服尺码</option>
					    	<option value="90">90</option>
					    	<option value="100">100</option>
					    	<option value="110">110</option>
					    	<option value="120">120</option>
					    	<option value="130">130</option>
					    	<option value="140">140</option>
                            <option value="150">150</option>
                            <option value="160">160</option>
					    </select>
                    </p>    
                    
                </div>

                <!--装备邮寄地址-->
                <div class="address-wrap">
                    <h3>邮寄地址</h3>
                    <textarea name="Address" v-model.trim="address" class="address-input" id="Address" placeholder="请输入装备邮寄地址"></textarea>
                   
                </div>
			</div>
			<div class="btn-wrap">
				<a class="btn" @click="postSubmit">提交</a>
			</div>
		</div>	
	</div>
</template>

<script type="ecamscript-6">
import Vue from 'vue'
import { Toast } from 'vant';

Vue.use(Toast);

	export default {
		data () {
            return {
                studentName: '',
                sex: '',
                idCard: '',
                height: '',
                weight: '',
                chothingSize: '',
                address: '',
                phone: ''
            }
		},
		methods: {
			postSubmit () {
				let postdata = {};

                if (this.studentName == '' || this.sex == '' || this.idCard == '' || this.height == '' || this.weight == '' || this.chothingSize == '' || this.address == '' || this.phone == '') {
                	Toast("请完善您的信息");
                	return;  
                }

                let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
                if (!myreg.test(this.phone)) {  
					Toast("请正确填写您的手机号");
					return 
                }

                postdata.studentName = this.studentName;
                postdata.sex = this.sex;
                postdata.idCard = this.idCard;
                postdata.height = this.height;
                postdata.weight = this.weight;
                postdata.chothingSize = this.chothingSize;
                postdata.address = this.address;
                postdata.phone = this.phone;

                this.$http.post("http://club.123zuqiu.cn/football/front/addMemberInfo", postdata).then((response) => {
				    response = response.body;
				    if (response.code == 0) {
				    	this.studentName = '';
				    	this.sex = '';
				    	this.idCard = '';
				    	this.height = '';
				    	this.weight = '';
				    	this.chothingSize = '';
				    	this.address = '';
				    	this.phone = '';
				        Toast("工作人员将根据您填写的信息，安排会员装备邮寄及保险购买等事宜", "信息提交成功")
				    } else {
				    	Toast(response.msg)
				    }
			    }, (response) => {
                    Toast("请求服务器错误，请稍后再试");
                })
                
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet">
@import "../common/scss/form.scss";
</style>