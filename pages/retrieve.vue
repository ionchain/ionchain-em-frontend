<template>
    <div class="page-retrieve">
        <div class="i-step">
            <div class="active"><span>1</span><label>填写账号</label></div>
            <div><b></b><span>2</span><label>账号验证</label></div>
            <div><b></b><span>3</span><label>设置新密码</label></div>
            <div><b></b><span>4</span><label>完成</label></div>
        </div>
          <ul class="retrieve-form-box">
            <li class="retrieve-step1 retrieve_cont_zh">
                <!-- 请输入手机号 -->
                <div class="register_cont_number">
                    <input type="text" placeholder="请输入手机号">
                </div>
                <div class="register_cont_click">
                    <button @click="showCheckRobotBox">点击按钮进行验证</button>
                </div>
                 <!-- 下一步按钮 -->
                <div  class="i-button">
                    <a href="javascript:;">下一步</a>
                </div>
            </li>
            <li class="retrieve-step2 retrieve_cont_yz">
                <div class="login_right_hint login_right_w">
                    <span><img src="/icon/error.svg" alt=""></span>
                    <span>验证码已过期或错误，请重新获取验证码</span>
                </div>
                 <!-- 请输入手机号 -->
                <div class="register_cont_number">
                    <input type="text" placeholder="请输入手机号">
                </div>
                <div class="register_cont_click_yz">
                    <div class="click_yz_yz">
                        <div><input type="text" placeholder="手机验证码"></div>
                        <div ><button>120s后重新获取</button><button class="click_yz_cx">重新获取</button></div> 
                    </div>
                    <div class="click_yz_text">校验码短信已发送到你的手机上，有效时间为10分钟，请及时查收。</div>
                </div>
                 <!-- 下一步按钮 -->
                <div  class="i-button">
                    <a href="javascript:;">下一步</a>
                </div>
            </li>
             <li class="retrieve-step3 retrieve_cont_sz">
                <!-- 输入密码 -->
                <div class="register_cont_pw">
                    <p><input type="text" placeholder="请输入密码"></p>
                    <p><input type="text"  placeholder="确定密码"></p>
                </div>
                <!-- 下一步按钮 -->
                <div  class="i-button">
                    <a href="javascript:;">下一步</a>
                </div>
             </li>
             <li class="retrieve-step4 register_cont_wc">
                    <div><img src="/icon/succeed.svg" alt=""></div>
                    <div>密码设置成功!</div>
                    <div  class="i-button">
                        <a href="javascript:;">完成</a>
                    </div>
            </li>
          </ul>
    </div>
</template>
