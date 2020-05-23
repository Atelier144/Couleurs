import React from "react"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode,
            userImage: this.props.user.image.url,
            userImageWarning: '',
            isRegisterNameError: false,
            isRegisterDescriptionError: false,
            registerNameBorderColor: '#7f7f7f',
            registerDescriptionBorderColor: '#7f7f7f',
            theColor: '#000000',
            isRegisterSubmitButtonDisabled: ''
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
        document.getElementById('react-register-form-image').click();
    }

    onClickButtonColor() {
        document.getElementById('react-register-form-color').click();
    }

    onChangeInputImage(e) {
        let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
        let file = e.target.files[0];
        let imageInput = document.getElementById('react-register-form-image');
        if(!(imageInput.value === '')){
            let fileNameRegExp = /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|)$/;
            if(!(file.type.match("image.*"))){
                this.setState({userImage: this.props.user.image.url});
                this.setState({userImageWarning: '画像ファイルをアップロードしてください'});
                imageInput.value = '';
            }else if(!(fileNameRegExp.test(file.name))){
                this.setState({userImage: this.props.user.image.url});
                this.setState({userImageWarning: 'gif、png、jpgのいずれかの画像ファイルをアップロードしてください'});
                imageInput.value = '';
            }else if(file.size > 1048576){
                this.setState({userImage: this.props.user.image.url});
                this.setState({userImageWarning: '1MB以内の画像ファイルをアップロードしてください'});
                imageInput.value = '';
            }else{
                this.setState({userImage: createObjectURL(file)});
                this.setState({userImageWarning: ''});
            }
        }else{
            this.setState({userImage: this.props.user.image.url});
            this.setState({userImageWarning: ''});
        }
    }

    onChangeInputName(e) {
        if(e.target.value.length === 0){
            this.setState({isRegisterNameError: true});
            this.setState({registerNameBorderColor: '#ff0000'});
            this.setState({isRegisterSubmitButtonDisabled: 'disabled'});
        }else{
            this.setState({isRegisterNameError: false});
            this.setState({registerNameBorderColor: '#7f7f7f'});
            if(!this.state.isRegisterDescriptionError){
                this.setState({isRegisterSubmitButtonDisabled: ''});
            }
        }
    }

    onChangeInputDescription(e) {
        if(e.target.value.length > 300){
            this.setState({isRegisterDescriptionError: true});
            this.setState({registerDescriptionBorderColor: '#ff0000'});
            this.setState({isRegisterSubmitButtonDisabled: 'disabled'});
        }else{
            this.setState({isRegisterDescriptionError: false});
            this.setState({registerDescriptionBorderColor: '#7f7f7f'});
            if(!this.state.isRegisterNameError){
                this.setState({isRegisterSubmitButtonDisabled: ''});
            }
        }
    }
    onChangeInputColor() {
        let color = document.getElementById('react-register-form-color').value;
        this.setState({theColor: color});
    }

    render(){
        let userImageWarning;
        let userNameWarning;
        let userDescriptionWarning;

        if(this.state.userImageWarning){
            userImageWarning = (
                <div className={'user-warning'}>
                    {this.state.userImageWarning}
                </div>
            )
        }

        if(this.state.isRegisterNameError){
            userNameWarning = (
                <div className={'user-warning'}>
                    入力してください
                </div>
            )
        }

        if(this.state.isRegisterDescriptionError){
            userDescriptionWarning = (
                <div className={'user-warning'}>
                    300字以内で記述してください
                </div>
            )
        }

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
                    {userImageWarning}
                    <input type={'file'} name={'image'} id={'react-register-form-image'} onChange={(e)=>{this.onChangeInputImage(e)}}/>

                    <label style={{'margin-top': '20px'}}>ユーザー名<small>（必須）</small></label>
                    <input type={'text'} name={'name'} style={{'border-color':this.state.registerNameBorderColor}} defaultValue={this.props.user.name} onChange={(e)=>{this.onChangeInputName(e)}}/>
                    {userNameWarning}

                    <label style={{'margin-top': '20px'}}>自己紹介<small>（300字以内）</small></label>
                    <textarea name={'description'} style={{'border-color':this.state.registerDescriptionBorderColor}} onChange={(e)=>{this.onChangeInputDescription(e)}}>
                        {this.props.user.description}
                    </textarea>
                    {userDescriptionWarning}

                    <label style={{'margin-top': '20px'}}>ホームページ</label>
                    <input type={'url'} name={'url'} defaultValue={this.props.user.url}/>
                    <h5>ズバリ、あなたの好きな色は！？</h5>
                    <button type={'button'} className={'color'} onClick={()=>{this.onClickButtonColor()}}>
                        <div className={'the-color'} style={{'background-color':this.state.theColor}}>
                        </div>
                    </button>
                    <div className={'selected-color'} style={{'color': this.state.theColor}}>{this.state.theColor.toUpperCase()}</div>
                    <input type={'color'} name={'color'} id={'react-register-form-color'} onChange={()=>{this.onChangeInputColor()}}/>

                    <button type={'submit'} disabled={this.state.isRegisterSubmitButtonDisabled}>登録</button>
                </form>
                <div className={`footer${this.state.mode}`}>
                    <a className={`footer-admin${this.state.mode}`} href={'https://twitter.com/AkioMabuchi'} target={'_blank'}>
                        2020 <i className={'far fa-copyright'}></i> @AkioMabuchi
                    </a>
                </div>
            </div>
        )
    }
}

export default Register
