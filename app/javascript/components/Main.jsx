import React from "react"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode,
            isShowingProfile: false,
            isHiddenProfile: "",
            profileImage: "",
            profileName: "",
            profileDescription: "",
            profileUrl: "",
            profileTwitterUrl: "",
            profileColor: ""
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

    }

    onClickButtonShare(){
        window.open(`https://twitter.com/intent/tweet?text=`+encodeURIComponent(`私の好きな色は「${this.props.userColor.toUpperCase()}」です。\n#webCouleurs #web1week\nhttps://colorful-profiles.com`));
    }

    onClickButtonProfileClose(){
        if(this.state.isHiddenProfile === ''){
            this.setState({isHiddenProfile: ' isHidden'});
            setTimeout(()=>{this.setState({isShowingProfile:false})},1000);
        }
    }
    render () {
        let header;
        let profile;
        if(this.props.userId === 0){
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
                    <button type={'button'} className={`user-image`} onClick={()=>{this.onClickButtonUserImage(this.props.userId)}}>
                        <img src={this.props.userImage}/>
                    </button>
                    <button type={'button'} className={`common settings`} style={{'color':this.props.userColor, 'border-color':this.props.userColor}} onClick={()=>{this.onClickButtonSetting()}}>
                        <i className={"fas fa-cog"}></i>
                    </button>
                    <button type={'button'} className={`common share`} style={{'color':this.props.userColor, 'border-color':this.props.userColor}} onClick={()=>{this.onClickButtonShare()}}>
                        <i className={"fas fa-share-alt"}></i>
                    </button>
                    <button type={'submit'} className={`common logout`} style={{'color':this.props.userColor, 'border-color':this.props.userColor}}>
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
                        <button className={'profile-close'} style={{'border-color':this.state.profileColor}} onClick={()=>{this.onClickButtonProfileClose()}}>
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
        return (
            <div className={`main${this.state.mode}`}>
                {header}
                <div className={'introduction'}>
                    <h1>WHAT COLOR DO YOU LIKE?</h1>
                    <p>好きな色でプロフィールをシェアしよう。</p>
                </div>
                {profile}
                <div className={'users-container'}>
                    {this.props.users.map((user)=>(
                        <button className={'user-button'} style={{'background-color':user.color}} onClick={()=>{this.onClickButtonUserImage(user.id)}}>
                            <img className={'user-image'} src={user.image.url}/>
                        </button>
                    ))}
                </div>
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
