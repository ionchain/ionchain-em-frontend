<div class="page-home">
	<!-- banner start -->
    <div class="section-banner">
      <div id="#banner" class=".section-main">
        <div class="viewer-box">
          <ul class="slide-wrap">
            <li>
              <a href="">
                <div class=".ads-words">广告位招租</div>
                <img src="/img/banner/test1.png"/>
                <div class="l-upper">
                  <div class="l-tool-bar">
                    <div class="l-main"><span class="item"><i class="icon-download"></i>
                        <s>20</s></span></div>
                        <span class="item item2"><i class="icon-eye"></i>
                        <s>20</s></span>
                        <button class="ic-btn-big i-outline-primary">#{i18n.__("参与投票")}</button>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class=".ads-words">广告位招租</div>
                <img src="/img/banner/test1.png"/>
                <div class="l-upper">
                  <div class="l-tool-bar">
                    <div class="l-main">
						<span class="item"><i class="icon-download"></i>
                        <s>20</s></span>
						<span class="item item2"><i class="icon-eye"></i>
                        <s>20</s></span>
                        <button class="ic-btn-big i-outline-primary">#{i18n.__("参与投票")}</button>
					</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class=".ads-words">广告位招租</div>
                <img src="/img/banner/test2.png"/>
                <div class="l-upper">
                  <div class="l-tool-bar">
                    <div class="l-main">
						<span class="item"><i class="icon-download"></i>
                        <s>20</s></span>
						<span class="item item2"><i class="icon-eye"></i>
                        <s>20</s></span>
                        <button class="ic-btn-big i-outline-primary">#{i18n.__("参与投票")}</button>
					</div>
                  </div>
                </div>
              </a>
            </li>
			<li>
              <a href="">
                <div class=".ads-words">广告位招租</div>
                <img src="/img/banner/test3.png"/>
                <div class="l-upper">
                  <div class="l-tool-bar">
                    <div class="l-main">
						<span class="item"><i class="icon-download"></i>
                        <s>20</s></span>
						<span class="item item2"><i class="icon-eye"></i>
                        <s>20</s></span>
                        <button class="ic-btn-big i-outline-primary">#{i18n.__("参与投票")}</button>
					</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
	<!-- banner end -->
	<!-- 公告 start -->
	<div class="section-notice home-section">
		<span>#{i18n.__("IONChain币总数")}：</span>
		<span class="f-32 bold"></span>
		<span> IONChain</span>
	</div>
	<!-- 公告 end -->
	<!-- 设备 start -->
	<div id="section-equipment-data" class="section-equipment-data">
		<p class="eq_prev icon-left-arrow"></p>
		<div class="section-main">
			<div class="slide-wrap" v-for="(item,index) in equList" :key="index">
			<div class="card-H">
				<div class="card-hd">荣耀P20 Pro手机</div>
				<div class="card-bd">
				<div class="l-progess">
					<input class="dial hide-tem"/>
					<div class="l-num them-em1"><span>85</span>
					<s>%</s>
					</div>
				</div>
				<div class="l-info">
					<p class="info1"><span class="tip-color">贡献度：</span><span class="bold them-em1 font-nm">8981</span><span class="them-em2">  IONC</span></p>
					<p><span class="tip-color">数量：</span><span>50 K</span></p>
					<p><span class="tip-color">在线时长：</span><span>9,099.00 h</span></p>
				</div>
				</div>
			</div>
			</div>
		</div>
		<p class="eq_next icon-right-arrow"></p>
	</div>
	<!-- 设备 end -->
	<!-- 数据图表 start -->
	<div class="section-chart">
		<div class="section-main">
			<div class="box-chart l-boxL">
				<div class="chart-hd"><span class="l-tit">贡献曲线</span>
					<ul class="l-panel">
						<li data-bind="click: changePeriod.bind($data,'24h')" class="active">24h</li>
						<li data-bind="click: changePeriod.bind($data, 'week')">周</li>
						<li data-bind="click: changePeriod.bind($data, 'month')">月</li>
						<li data-bind="click: changePeriod.bind($data, 'year')">年</li>
					</ul>
				</div>
				<div id="chart1" class="chart-bd chart1">
					<div class="error-tip-gray">您的浏览器版本过低，不支持canvas，请升级浏览器，或更换支持的浏览器，如 chrome ，firefox 等，以显示完整内容</div>
				</div>
			</div>
			<div class="box-chart l-boxR">
				<div class="chart-hd"><span class="l-tit">类型增长比</span>
					<ul class="l-panel">
					<li data-bind="click: changePeriod2.bind($data,'24h')" class="active">24h</li>
					<li data-bind="click: changePeriod2.bind($data, 'week')">周</li>
					<li data-bind="click: changePeriod2.bind($data, 'month')">周</li>
					<li data-bind="click: changePeriod2.bind($data, 'year')">年</li>
					</ul>
				</div>
				<div id="chart2" class="chart-bd chart2">
					<div style="display:none;" data-bind="visible: canvasError()" class="error-tip-gray">您的浏览器版本过低，不支持canvas，请升级浏览器，或更换支持的浏览器，如 chrome ，firefox 等，以显示完整内容</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 数据图表 en -->
	<!-- 广告位 start -->
	<div class="section-adv">
		<img src="/img/home/adv-bg.png" class="wid-max"/>
		<div class="l-upper">
			<p>让你的设备加入全球物联网</p><a class="ic-btn-normal i-primary">发布设备</a>
		</div>
	</div>
	<!-- 广告位 end -->
	<!-- 设备，卡片列表 start -->

	<!-- 设备，卡片列表 end -->
  </div>