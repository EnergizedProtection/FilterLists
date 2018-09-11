import * as React from "react";
import SubscribeButton from "./SubscribeButton";

export default class SubscribeButtonGroup extends React.Component<ISubscribeButtonGroupProps, any> {
    constructor(props: ISubscribeButtonGroupProps) {
        super(props);
    }

    render() {
        return this.props.urlMirror1
            ? (<div className="btn-group-vertical fl-btn-details-action" role="group">
                   <button id="btnGroupDropSubscribe" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Subscribe
                   </button>
                   <div className="dropdown-menu" aria-labelledby="btnGroupDropSubscribe">
                       <SubscribeButton name={this.props.name} url={this.props.url} text="Original" isOriginal={true}/>
                       <SubscribeButton name={this.props.name} url={this.props.urlMirror1} text="Mirror 1" isOriginal={false}/>
                       <SubscribeButton name={this.props.name} url={this.props.urlMirror2} text="Mirror 2" isOriginal={false}/>
                   </div>
               </div>)
            : <SubscribeButton name={this.props.name} url={this.props.url} text="Subscribe" isOriginal={true}/>;
    }
}

interface ISubscribeButtonGroupProps {
    name: string;
    url: string;
    urlMirror1: string;
    urlMirror2: string;
}