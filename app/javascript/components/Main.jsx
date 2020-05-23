import React from "react"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode,
            isShowingProfile: false,
            isHiddenProfile: "",
            isShowingSettings: false,
            isHiddenSettings: "",
            profileImage: "",
            profileName: "",
            profileDescription: "",
            profileUrl: "",
            profileTwitterUrl: "",
            profileColor: "",
            settingsImage: this.props.user.image.url,
            settingsColor: this.props.user.color,
            settingsImageWarning: "",
            isSettingsNameError: false,
            isSettingsDescriptionError: false,
            settingsNameBorderColor: '#7f7f7f',
            settingsDescriptionBorderColor: '#7f7f7f',
            isSettingsSubmitButtonDisabled: "",
            settingsSetColor: this.props.user.color
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

    onClickButtonUserImage(id) {
        fetch('/get-user-json',{
            method: 'POST',
            body: JSON.stringify({
                id: id
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            return  response.json()
        }).then((result)=>{
            this.setState({isHiddenProfile: ''});
            this.setState({isShowingProfile: true});
            this.setState({profileImage: result.image.url});
            this.setState({profileName: result.name});
            this.setState({profileDescription: result.description});
            this.setState({profileUrl: result.url});
            this.setState({profileTwitterUrl: result.twitter_url});
            this.setState({profileColor: result.color});
        });
    }

    onClickButtonSetting(){
        this.setState({isHiddenSettings: ''});
        this.setState({isShowingSettings: true});
    }

    onClickButtonShare(){
        window.open(`https://twitter.com/intent/tweet?text=`+encodeURIComponent(`私の好きな色は「${this.props.userColor.toUpperCase()}」です。\n#webCouleurs #web1week\nhttps://colorful-profiles.com`));
    }

    onClickButtonSettingsClose(){
        if(this.state.isHiddenSettings === ''){
            this.setState({isHiddenSettings: ' isHidden'});
            setTimeout(()=>{this.setState({isShowingSettings: false})},1000);
        }
    }
    onClickButtonProfileClose(){
        if(this.state.isHiddenProfile === ''){
            this.setState({isHiddenProfile: ' isHidden'});
            setTimeout(()=>{this.setState({isShowingProfile: false})},1000);
        }
    }

    onClickButtonSettingsImage(){
        document.getElementById('react-settings-image').click();
    }

    onClickButtonSettingsColor(){
        document.getElementById('react-settings-color').click();
    }

    onChangeSettingsImage(e){
        let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
        let file = e.target.files[0];
        let imageInput = document.getElementById('react-settings-image');
        if(!(imageInput.value === '')){
            let fileNameRegExp = /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|)$/;
            if(!(file.type.match("image.*"))){
                this.setState({settingsImage: this.props.user.image.url});
                this.setState({settingsImageWarning: '画像ファイルをアップロードしてください'});
                imageInput.value = '';
            }else if(!(fileNameRegExp.test(file.name))){
                this.setState({settingsImage: this.props.user.image.url});
                this.setState({settingsImageWarning: 'gif、png、jpgのいずれかの画像ファイルをアップロードしてください'});
                imageInput.value = '';
            }else if(file.size > 1048576){
                this.setState({settingsImage: this.props.user.image.url});
                this.setState({settingsImageWarning: '1MB以内の画像ファイルをアップロードしてください'});
                imageInput.value = '';
            }else{
                this.setState({settingsImage: createObjectURL(file)});
                this.setState({settingsImageWarning: ''});
            }
        }else{
            this.setState({settingsImage: this.props.user.image.url});
            this.setState({settingsImageWarning: ''});
        }
    }

    onChangeSettingsName(e){
        if (e.target.value.length === 0) {
            this.setState({isSettingsNameError: true});
            this.setState({settingsNameBorderColor: '#FF0000'});
            this.setState({isSettingsSubmitButtonDisabled: 'disabled'});
        } else {
            this.setState({isSettingsNameError: false});
            this.setState({settingsNameBorderColor: '#7F7F7F'});
            if(!this.state.isSettingsDescriptionError){
                this.setState({isSettingsSubmitButtonDisabled: ''});
            }
        }
    }

    onChangeSettingsDescription(e) {
        if(e.target.value.length > 300){
            this.setState({isSettingsDescriptionError: true});
            this.setState({settingsDescriptionBorderColor: '#FF0000'});
            this.setState({isSettingsSubmitButtonDisabled: 'disabled'});
        }else{
            this.setState({isSettingsDescriptionError: false});
            this.setState({settingsDescriptionBorderColor: '#7F7F7F'});
            if(!this.state.isSettingsNameError){
                this.setState({isSettingsSubmitButtonDisabled: ''});
            }
        }
    }

    onChangeSettingsColor(e){
        this.setState({settingsSetColor: e.target.value});
    }

    render () {
        let header;
        let profile;
        let settings;
        let settingsImageWarning;
        let settingsNameWarning;
        let settingsDescriptionWarning;

        if(this.state.settingsImageWarning){
            settingsImageWarning = (
                <div className={'settings-warning'}>
                    {this.state.settingsImageWarning}
                </div>
            )
        }

        if(this.state.isSettingsNameError){
            settingsNameWarning = (
                <div className={'settings-warning'}>
                    入力してください
                </div>
            )
        }

        if(this.state.isSettingsDescriptionError){
            settingsDescriptionWarning = (
                <div className={'settings-warning'}>
                    300字以内で記述してください
                </div>
            )
        }

        if(this.props.user.id === 0){
            header = (
                <form action={'/auth/twitter'} method={'POST'} className={`header${this.state.mode}`}>
                    <div className={'logo'}>COULEURS</div>
                    <button type={'submit'} className={`twitter`}>
                        <i className={"fab fa-twitter"}></i> ログイン/登録
                    </button>
                    <button type={'button'} className={`change-mode${this.state.mode}`} onClick={()=>{this.onClickButtonChangeMode()}}>
                        <i className="far fa-lightbulb"></i>
                    </button>
                </form>
            )
        }else{
            header = (
                <form action={'/logout'} method={'POST'} className={`header${this.state.mode}`}>
                    <div className={'logo'}>COULEURS</div>
                    <button type={'button'} className={`user-image`} onClick={()=>{this.onClickButtonUserImage(this.props.user.id)}}>
                        <img src={this.props.user.image.url}/>
                    </button>
                    <button type={'button'} className={`common settings`} style={{'color':this.props.user.color, 'border-color':this.props.user.color}} onClick={()=>{this.onClickButtonSetting()}}>
                        <i className={"fas fa-cog"}></i>
                    </button>
                    <button type={'button'} className={`common share`} style={{'color':this.props.user.color, 'border-color':this.props.user.color}} onClick={()=>{this.onClickButtonShare()}}>
                        <i className={"fas fa-share-alt"}></i>
                    </button>
                    <button type={'submit'} className={`common logout`} style={{'color':this.props.user.color, 'border-color':this.props.user.color}}>
                        <i className={"fas fa-sign-out-alt"}></i>
                    </button>
                    <button type={'button'} className={`change-mode${this.state.mode}`} onClick={()=>{this.onClickButtonChangeMode()}}>
                        <i className="far fa-lightbulb"></i>
                    </button>
                </form>
            )
        }
        if(this.state.isShowingProfile){
            profile = (
                <div className={`profile${this.state.isHiddenProfile}`} style={{'background-color':`${this.state.profileColor}2F`}}>
                    <div className={'profile-box'} style={{'background-color':`${this.state.profileColor}5F`}}>
                        <button type={'button'} className={'profile-close'} style={{'border-color':this.state.profileColor}} onClick={()=>{this.onClickButtonProfileClose()}}>
                            <i className="fas fa-times" style={{'color': this.state.profileColor}}></i>
                        </button>
                        <img src={this.state.profileImage}/>
                        <div className={'profile-name'} style={{'color':this.state.profileColor}}>
                            {this.state.profileName}
                        </div>
                        <div className={'profile-description'} style={{'color':this.state.profileColor, 'border-color':this.state.profileColor}}>
                            {this.state.profileDescription}
                        </div>
                        <div className={'profile-url'}>
                            <span><i className={'fas fa-home'} style={{'color':this.state.profileColor}}></i></span><a href={this.state.profileUrl} target={'_blank'} style={{'color':this.state.profileColor}}>{this.state.profileUrl}</a>
                        </div>
                        <div className={'profile-url'}>
                            <span><i className={'fab fa-twitter'} style={{'color':this.state.profileColor}}></i></span><a href={this.state.profileTwitterUrl} target={'_blank'} style={{'color':this.state.profileColor}}>{this.state.profileTwitterUrl}</a>
                        </div>
                        <div className={'profile-like-color'} style={{'color':this.state.profileColor, 'border-color':this.state.profileColor}}>
                            好きな色は「{this.state.profileColor.toUpperCase()}」です。
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.isShowingSettings){
            settings = (
                <div className={`settings-container${this.state.isHiddenSettings}`} style={{'background-color':`${this.state.settingsColor}2F`}}>
                    <form action={'/update'} method={'POST'} encType={'multipart/form-data'} className={'settings-form'} style={{'background-color':`${this.state.settingsColor}5F`}}>
                        <button type={'button'} className={'settings-close'} style={{'border-color':this.state.settingsColor}} onClick={()=>{this.onClickButtonSettingsClose()}}>
                            <i className="fas fa-times" style={{'color': this.state.settingsColor}}></i>
                        </button>
                        <label style={{'color':this.state.settingsColor}}>ユーザー画像<small>（1MB以内のgif、png、jpg）</small></label>
                        <img src={this.state.settingsImage}/>
                        <button type={'button'} className={'settings-image'} style={{'background-color':`${this.state.settingsColor}3F`, 'border-color':this.state.settingsColor, 'color':this.state.settingsColor}} onClick={()=>{this.onClickButtonSettingsImage()}}>
                            ファイルを選択
                        </button>
                        <input type={'file'} name={'image'} id={'react-settings-image'} onChange={(e)=>{this.onChangeSettingsImage(e)}}/>
                        {settingsImageWarning}
                        <label style={{'color':this.state.settingsColor, 'margin-top':'20px'}}>ユーザー名<small>（必須）</small></label>
                        <input type={'text'} name={'name'} style={{'border-color':this.state.settingsNameBorderColor}} onChange={(e)=>{this.onChangeSettingsName(e)}} defaultValue={this.props.user.name}/>
                        {settingsNameWarning}
                        <label style={{'color':this.state.settingsColor, 'margin-top':'20px'}}>自己紹介<small>（300字以内）</small></label>
                        <textarea name={'description'} style={{'border-color':this.state.settingsDescriptionBorderColor}} onChange={(e)=>{this.onChangeSettingsDescription(e)}}>
                            {this.props.user.description}
                        </textarea>
                        {settingsDescriptionWarning}
                        <label style={{'color':this.state.settingsColor, 'margin-top':'20px'}}>ホームページ</label>
                        <input type={'url'} name={'url'} defaultValue={this.props.user.url}/>
                        <label style={{'color':this.state.settingsColor, 'margin-top':'20px'}}>好きな色</label>
                        <button type={'button'} className={'settings-color'} onClick={()=>{this.onClickButtonSettingsColor()}}>
                            <div className={'the-color'} style={{'background-color':this.state.settingsSetColor}}></div>
                        </button>
                        <div className={'selected-color'} style={{'color':this.state.settingsSetColor}}>{this.state.settingsSetColor.toUpperCase()}</div>
                        <input type={'color'} name={'color'} id={'react-settings-color'} defaultValue={this.state.settingsSetColor} onChange={(e)=>{this.onChangeSettingsColor(e)}}/>
                        <label style={{'color':this.state.settingsColor, 'margin-top':'20px'}}>公開設定</label>
                        <div className={'check-box'}>
                            <input type={'checkbox'} name={'is_published'} defaultChecked={this.props.user.is_published}/>
                            <div className={'checkbox-name'} style={{'color':this.state.settingsColor}}>公開</div>
                        </div>
                        <button type={'submit'} disabled={this.state.isSettingsSubmitButtonDisabled} style={{'background-color':`${this.state.settingsColor}3F`, 'border-color':this.state.settingsColor, 'color':this.state.settingsColor}}>
                            更新
                        </button>
                    </form>
                </div>
            )
        }


        return (
            <div className={`main${this.state.mode}`}>
                {header}
                <div className={'introduction'}>
                    <h1>WHAT COLOR DO YOU LIKE?</h1>
                    <p>好きな色でプロフィールをシェアしよう</p>
                </div>
                {profile}
                <div className={'users-container'}>
                    {this.props.users.map((user)=>(
                        <button className={'user-button'} style={{'background-color':user.color}} onClick={()=>{this.onClickButtonUserImage(user.id)}}>
                            <img className={'user-image'} src={user.image.url}/>
                        </button>
                    ))}
                </div>
                {settings}
                <div className={`footer${this.state.mode}`}>
                    <a className={`footer-admin${this.state.mode}`} href={'https://twitter.com/AkioMabuchi'} target={'_blank'}>
                        2020 <i className={'far fa-copyright'}></i> @AkioMabuchi
                    </a>
                </div>
            </div>
        );
    }
}

export default Main
