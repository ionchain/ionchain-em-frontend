<template>
  <footer class="ly-footer" id="footer_pc">
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-3 col-xs-3">
                <div class="footer_text1">
                    <div class="col-titles" v-html="$t('vote')">关于</div>
                    <a href="team_CN.html" v-html="$t('team')">团队</a>
                    <a href="pdfjs/web/viewer_CN.html" v-html="$t('white_paper')">白皮书</a>
                    <a href="vision_CN.html" v-html="$t('foundation')">基金会</a>
                    <a href="http://ionc_stoer.ionchain.org/"  v-html="$t('IONPartnership')">厂商生态</a>
                </div>

            </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
                <div class="footer_text2">
                    <div class="col-titles" v-html="$t('technology')">技术</div>
                    <a href="wallet.html" v-html="$t('wallet')">钱包</a>
                    <a href="coming_soon.html" v-html="$t('explorer')">浏览器</a>
                    <a href="coming_soon.html" v-html="$t('explorer')">DAPP</a>
                </div>

            </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
                <div class="footer_text3">
                    <div class="col-titles" v-html="$t('technology')">联系</div>
                    <a href="mailto:80863100@qq.com" v-html="$t('summary')">概要</a>
                    <a href="mailto:80863100@qq.com" v-html="$t('media')">媒体</a>
                    <a href="mailto:80863100@qq.com" v-html="$t('work')">工作</a>
                    <a href="mailto:80863100@qq.com" v-html="$t('laboratory')">实验室</a>
                </div>

            </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
                <div class="footer_text4">
                    <div class="col-titles" v-html="$t('language')">语言</div>
                    <a href="/?locale=zh_CN" >中文</a>
                    <a href="/?locale=en" >English</a>
                </div>

            </div>
        </div>
    </div>
    <div class="text-center copyright">
        <div class="container">
            <div class="row copyrights">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="tb_img">
                        <a href="https://github.com/ionchain" target="_blank"></a>
                        <a href="https://www.youtube.com/channel/UC-wi7uAGZ9Wr5yeVVOycm_A" target="_blank"></a>
                        <a href="https://twitter.com/IONChain" target="_blank"></a>
                        <a href="https://t.me/ionchain" target="_blank"></a>
                        <a href="https://www.linkedin.com/company/ionchain/" target="_blank"></a>
                        <a href="https://medium.com/@ionchain" target="_blank"></a>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="tb_wz">
                        <div>Copyright © 2018 IONChain Fundation Singapore</div>
                        <div>All rights reserved</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  </footer>
</template>
