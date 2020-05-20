import React from "react"

class Twitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode
        }
    }

    componentDidMount() {
        document.getElementById('react-twitter-button').click();
    }

    render() {
        return (
            <div className={`main${this.state.mode}`}>
                <div className={`header${this.state.mode}`}>
                    <div className={`logo`}>COULEURS</div>
                </div>
                <form action={'/twitter'} method={'POST'} className={'twitter-form'}>
                    <div className={`notice${this.state.mode}`}>
                        ただいま、Twitterと連携中
                    </div>
                    <input type={'text'} name={'provider'} value={this.props.provider}/>
                    <input type={'text'} name={'uid'} value={this.props.uid}/>
                    <input type={'text'} name={'name'} value={this.props.name}/>
                    <input type={'text'} name={'image'} value={this.props.image}/>
                    <input type={'text'} name={'description'} value={this.props.description}/>
                    <input type={'text'} name={'url'} value={this.props.url}/>
                    <input type={'text'} name={'twitter_url'} value={this.props.twitter_url}/>
                    <input type={'submit'} id={'react-twitter-button'}/>
                </form>
            </div>
        )
    }
}

export default Twitter
