const MathJax = () => {
	if (typeof window.MathJax === 'object') {
		initMathJax()
	} else {
		const script = document.createElement('script')
		//MathJax地址，为保持稳定可以下载到自己的服务器上引用,注意config参数不可忽略
		script.src =
			'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML'
		script.onload = initMathJax.bind(window);
		document.head.appendChild(script)
	}
}
const initMathJax = () => {
	window.MathJax.Hub.Config({
		showProcessingMessages: false, //关闭js加载过程信息
		messageStyle: "none", //不显示信息
		jax: ["input/TeX", "output/HTML-CSS"],
		tex2jax: {
			inlineMath: [
				["$", "$"],
				["\\(", "\\)"]
			], //行内公式选择符
			// displayMath: [
			// 	["$$", "$$"],
			// 	["\\[", "\\]"]
			// ], //段内公式选择符
			skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a"] //避开某些标签
		},
		"HTML-CSS": {
			availableFonts: ["STIX", "TeX"], //可选字体
			showMathMenu: false //关闭右击菜单显示
		}
	});
	if (!window.MathJax) {
		return;
	}
	//container 是当前页面DOM的ID，可以自定义
	window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementById('container')]);
}
 
export default MathJax