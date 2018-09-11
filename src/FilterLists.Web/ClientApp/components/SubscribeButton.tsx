import * as React from "react";

export default class SubscribeButton extends React.Component<any, any> {

    constructor(props: ISubscribeUrlDto) {
        super(props);
    }

    render() {
        return <div className="btn-group-vertical" role="group">
                   <button id="btnGroupDropSubscribe" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Subscribe
                   </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDropSubscribe">
                       <SubscribeUrl details={this.props.details} />
                <SubscribeUrlMirror details={this.props.details} index={1} />
                <SubscribeUrlMirror details={this.props.details} index={2} />
                   </div>
               </div>;
    }
}

function SubscribeUrl(props: any) {
    return props.details.viewUrl.indexOf("https://") === -1
        ? SubscribeUrlNotSecure()
        : props.details.viewUrl.indexOf("web.archive.org") === -1
            ? SubscribeUrlPrimary()
            : SubscribeUrlWayback();

    function SubscribeUrlPrimary() {
        return <a href={`abp:subscribe?location=${encodeURIComponent(props.details.viewUrl)}&amp;title=${encodeURIComponent(props.details.name)}`}
                  className="btn btn-primary btn-block fl-btn-details-action"
                  title={`Subscribe to list with browser extension supporting \"abp:\" protocol (e.g. uBlock Origin, AdBlock Plus).`}>
                   Subscribe
               </a>;
    }

    function SubscribeUrlWayback() {
        return <a href={`abp:subscribe?location=${encodeURIComponent(props.details.viewUrl)}&amp;title=${encodeURIComponent(props.details.name)}`}
                  className="btn btn-secondary btn-block fl-btn-details-action"
                  title={`Archive.org Mirror (Original Offline) - Subscribe to list with browser extension supporting \"abp:\" protocol (e.g. uBlock Origin, AdBlock Plus).`}>
                   Subscribe
               </a>;
    }

    function SubscribeUrlNotSecure() {
        return <a href={`abp:subscribe?location=${encodeURIComponent(props.details.viewUrl)}&amp;title=${encodeURIComponent(props.details.name)}`}
                  className="btn btn-danger btn-block fl-btn-details-action"
                  title={`Not Secure - Subscribe to list with browser extension supporting \"abp:\" protocol (e.g. uBlock Origin, AdBlock Plus).`}>
                   Subscribe
               </a>;
    }
};

function SubscribeUrlMirror(props: any, index: number) {
    return index === 1
        ? props.details.viewUrlMirror1
            ? props.details.viewUrlMirror1.indexOf("https://") === -1
                ? SubscribeUrlNotSecure(props.details.viewUrlMirror1)
                : SubscribeUrlSecondary(props.details.viewUrlMirror1)
            : null
        : props.details.viewUrlMirror2
            ? props.details.viewUrlMirror2.indexOf("https://") === -1
                ? SubscribeUrlNotSecure(props.details.viewUrlMirror2)
                : SubscribeUrlSecondary(props.details.viewUrlMirror2)
            : null;

    function SubscribeUrlSecondary(url: any) {
        return <a href={`abp:subscribe?location=${encodeURIComponent(url)}&amp;title=${encodeURIComponent(props.details.name)}`}
                  className="btn btn-secondary btn-block fl-btn-details-action"
                  title={`Mirror - Subscribe to list with browser extension supporting \"abp:\" protocol (e.g. uBlock Origin, AdBlock Plus).`}>
                   Mirror
               </a>;
    }

    function SubscribeUrlNotSecure(url: any) {
        return <a href={`abp:subscribe?location=${encodeURIComponent(url)}&amp;title=${encodeURIComponent(props.details.name)}`}
                  className="btn btn-danger btn-block fl-btn-details-action"
                  title={`Mirror - Not Secure - Subscribe to list with browser extension supporting \"abp:\" protocol (e.g. uBlock Origin, AdBlock Plus).`}>
                   Mirror
               </a>;
    }
};

interface ISubscribeUrlDto {
    name: string;
    viewUrl: string;
    viewUrlMirror1: string;
    viewUrlMirror2: string;
}