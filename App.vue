<script>
	export default {
		onLoad(){
			
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*alkdPGG*/
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	.displayflex{
		display:-webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1 !important;
		font-size: 14px !important;
		font-family: "微软雅黑" !important;
		background-color: #f6f6f6 !important;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	embed{
		width: 100%;
		height: 100%;
		display: block;
		overflow-y: scroll;
	}
	a{
		color: #333;
		text-decoration:none;
	}
	a:hover{
		color: #2fad68
	}
	body,html{
		width: 100%;
		overflow-x: hidden;
	}
	input,
	button {
		border: none;
		outline: inherit;
	}
	input:focus,textarea:focus{
		outline: none !important;
		border: 1px solid #2FAD68 !important;
	}
</style>
