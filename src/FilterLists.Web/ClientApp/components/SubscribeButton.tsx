import * as React from "react";

export default class SubscribeButton extends React.Component<ISubscribeButtonProps, any> {
    constructor(props: ISubscribeButtonProps) {
        super(props);
        this.state = {
            buttonClassName: props.isOriginal ? "btn-primary" : "btn-secondary",
            titlePrefix: ""
        };
    }

    componentDidMount() {
        if (this.props.url) {
            this.setStateWayback();
            this.setStateInsecure();
        }
    }

    setStateWayback() {
        if (this.props.url.indexOf("web.archive.org") !== -1) {
            this.setState({
                buttonClassName: "btn-secondary"
            });
        }
    }

    setStateInsecure() {
        if (this.props.url.indexOf("https://") === -1) {
            this.setState({
                buttonClassName: "btn-danger",
                titlePrefix: "Not Secure - "
            });
        }
    }

    render() {
        const href = `abp:subscribe?location=${encodeURIComponent(this.props.url)}&amp;title=${encodeURIComponent(this.props.name)}`;
        const title = `${this.state.titlePrefix}Subscribe to list with a browser extension supporting the \"abp:\" protocol (e.g. uBlock Origin, Adblock Plus).`;
        const className = `btn ${this.state.buttonClassName} btn-block fl-btn-details-action`;
        return this.props.url
            ? <a href={href} title={title} className={className}>
                  {this.props.text}
              </a>
            : null;
    }
}

interface ISubscribeButtonProps {
    name: string;
    url: string;
    text: string;
    isOriginal: boolean;
}