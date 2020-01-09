import './default.scss';

const _html = `
    <div class="footer-nav">
        <div class="footer"> &copy;copyright 2017 ThoughtWorks</div>
    </div>
`
const Footer = (()=>{
    class Footer{
        constructor(config){
            this.config = Object.assign({
                node: '#footer'
            }, config);
            this.node = this.config.node;
            this.render();
        }
        render(){
            const _node = document.querySelector(this.node);
            _node.innerHTML = _html;
        }
    }
    return Footer;
})();

export default Footer;