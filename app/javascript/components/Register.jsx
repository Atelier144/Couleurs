import React from "react"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode,
            userImage: this.props.user.image.url,
            theColor: '#000000'
        }
    }

    onClickButtonChangeMode() {
        fetch('/change-mode', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            return response.text()
        }).then((result)=>{
            if(result === 'dark-mode'){
                this.setState({mode: ' dark-mode'});
            }else if(result === 'light-mode'){
                this.setState({mode: ''});
            }
        });
    }

    onClickButtonImage() {

    }

    onClickButtonColor() {
        document.getElementById('react-register-form-color').click();
    }

    onChangeInputColor() {
        let color = document.getElementById('react-register-form-color').value;
        this.setState({theColor: color});
    }
    render(){
        return(
            <div className={`main${this.state.mode}`}>
                <form action={'/logout'} method={'POST'} className={`header${this.state.mode}`}>
                    <div className={'logo'}>COULEURS</div>
                    <button type={'submit'} className={`common logout${this.state.mode}`}>
                        <i className={"fas fa-sign-out-alt"}></i>
                    </button>
                    <button type={'button'} className={`change-mode${this.state.mode}`} onClick={()=>{this.onClickButtonChangeMode()}}>
                        <i className="far fa-lightbulb"></i>
                    </button>
                </form>
                <div className={`welcome${this.state.mode}`}>
                    <h2>WELCOME!</h2>
                    <p>プロフィールと好きな色を登録しよう！</p>
                </div>
                <form action={"/register"} method={'POST'} className={`register-form`}>
                    <label>ユーザー画像<small>（1MB以内のgif、png、jpg）</small></label>
                    <img src={this.state.userImage}/>
                    <button type={'button'} className={'register-image'} onClick={()=>{this.onClickButtonImage()}}>
                        ファイルを選択
                    </button>
                    <input type={'file'} name={'image'} id={'react-register-form-image'}/>
                    <label style={{'margin-top': '20px'}}>ユーザー名<small>（必須）</small></label>
                    <input type={'text'} name={'name'} defaultValue={this.props.user.name}/>
                    <label style={{'margin-top': '20px'}}>自己紹介<small>（300字以内）</small></label>
                    <textarea name={'description'}>{this.props.user.description}</textarea>
                    <label style={{'margin-top': '20px'}}>ホームページ</label>
                    <input type={'url'} name={'url'} defaultValue={this.props.user.url}/>
                    <h5>ズバリ、あなたの好きな色は！？</h5>
                    <button type={'button'} className={'color'} onClick={()=>{this.onClickButtonColor()}}>
                        <div className={'the-color'} style={{'background-color':this.state.theColor}}>
                        </div>
                    </button>
                    <div className={'selected-color'} style={{'color': this.state.theColor}}>{this.state.theColor.toUpperCase()}</div>
                    <input type={'color'} name={'color'} id={'react-register-form-color'} onChange={()=>{this.onChangeInputColor()}}/>
                    <button type={'submit'}>登録</button>
                </form>
            </div>
        )
    }
}

export default Register
