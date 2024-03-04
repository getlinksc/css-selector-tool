export const SELECTOR_JS = `
<script>
    !function(){var e=document.getElementsByTagName("head")[0],t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("media","screen"),t.setAttribute("href","${process.env.NEXT_PUBLIC_URL}/res/selectorgadget_combined.css?r="+Math.random()),(e||document.body).appendChild(t),(t=document.createElement("script")).setAttribute("type","text/javascript"),t.setAttribute("src","${process.env.NEXT_PUBLIC_URL}/res/selectorgadget_combined.js?r="+Math.random()),(e||document.body).appendChild(t);var r=setInterval((function(){"undefined"!=typeof SelectorGadget&&(clearInterval(r),SelectorGadget.toggle({analytics:!1}))}),50)}();
</script>
`