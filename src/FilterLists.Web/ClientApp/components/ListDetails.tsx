import * as React from "react";
import "isomorphic-fetch";
import * as moment from "moment";
import SubscribeButton from "./SubscribeButton";

export default class ListDetails extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            responseLoaded: false,
            listId: props.listId
        };
        this.fetchData();
    }

    fetchData() {
        fetch(`https://filterlists.com/api/v1/lists/${this.state.listId}`)
            .then(response => response.json() as Promise<IFilterListDetailsDto[]>)
            .then(data => {
                this.setState({
                    filterListDetails: data,
                    responseLoaded: true
                });
            });
    }

    render() {
        return this.state.responseLoaded
            ? <div>
                  <FilterListDetails details={this.state.filterListDetails}/>
              </div>
            : <div>Loading...</div>;
    }

    //https://stackoverflow.com/a/11868398/2343739
    static getContrast(hexcolor: string) {
        const r = parseInt(hexcolor.substr(0, 2), 16);
        const g = parseInt(hexcolor.substr(2, 2), 16);
        const b = parseInt(hexcolor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? "black" : "white";
    }
}

function FilterListDetails(props: any) {
    return <div className="card border-primary">
               <div className="card-body p-2">
                   <div className="container m-0">
                       <div className="row">
                           <ListInfo details={props.details}/>
                           <ListUrls details={props.details}/>
                       </div>
                       <div className="row">
                           <Maintainers maintainers={props.details.maintainers}/>
                       </div>
                   </div>
               </div>
           </div>;
}

function ListInfo(props: any) {
    return <div className="col-9">
               <Tags tags={props.details.tags}/>
               <Description description={props.details.description} url={props.details.descriptionSourceUrl}/>
               <ul className="list-group list-group-flush">
                   <Languages languages={props.details.languages}/>
                   <RuleCount count={props.details.ruleCount}/>
                   <DiscontinuedDate date={props.details.discontinuedDate}/>
                   {props.details.discontinuedDate ? null : <UpdatedDate date={props.details.updatedDate}/>}
                   <PublishedDate date={props.details.publishedDate}/>
                   <License license={props.details.license}/>
               </ul>
           </div>;
}

function ListUrls(props: any) {
    return <div className="col-3 p-0 btn-group-vertical justify-content-start d-flex align-items-end">
               <SubscribeButton details={props.details}/>
               <ViewUrl url={props.details.viewUrl} name={props.details.name}/>
               <ViewUrlMirror url={props.details.viewUrlMirror1} name={props.details.name}/>
               <ViewUrlMirror url={props.details.viewUrlMirror2} name={props.details.name}/>
               <HomeUrl url={props.details.homeUrl} name={props.details.name}/>
               <PolicyUrl url={props.details.policyUrl} name={props.details.name}/>
               <DonateUrl url={props.details.donateUrl} name={props.details.name}/>
               <IssuesUrl url={props.details.issuesUrl} name={props.details.name}/>
               <ForumUrl url={props.details.forumUrl} name={props.details.name}/>
               <ChatUrl url={props.details.chatUrl} name={props.details.name}/>
               <SubmissionUrl url={props.details.submissionUrl} name={props.details.name}/>
               <EmailAddress email={props.details.emailAddress} name={props.details.name}/>
           </div>;
}

function Tags(props: any) {
    return props.tags.length > 0
        ? <div className="d-md-none">{props.tags.map(
            (tag: any) => <span className="badge" style={{
                backgroundColor: `#${tag.colorHex}`,
                color: ListDetails.getContrast(`${tag.colorHex}`)
            }} title={tag.description}>{tag.name}</span>)}</div>
        : null;
}

function Description(props: any) {
    return props.description
        ? (props.url
            ? <h3 className="card-header fl-description">
                  <blockquote cite={props.url} className="m-0">{props.description}</blockquote>
              </h3>
            : <h3 className="card-header fl-description">{props.description}</h3>)
        : null;
}

function Languages(props: any) {
    return props.languages.length > 0
        ? props.languages.length > 1
        ? <li className="list-group-item">
              <p className="m-0">Languages:</p>
              <ul>
                  {props.languages.map((language: any) => <li>{language}</li>)}
              </ul>
          </li>
        : <li className="list-group-item">
              <p>Language: {props.languages.map((language: any) => language)}</p>
          </li>
        : null;
}

function RuleCount(props: any) {
    return props.count > 0
        ? <li className="list-group-item">
              <p>Rule Count: {props.count.toLocaleString()}</p>
          </li>
        : null;
}

function DiscontinuedDate(props: any) {
    return props.date
        ? <li className="list-group-item">
              <p>Discontinued: {moment(props.date).format("l")}</p>
          </li>
        : null;
}

function UpdatedDate(props: any) {
    return props.date
        ? <li className="d-md-none list-group-item">
              <p>Updated: {moment(props.date).isValid() ? moment(props.date).format("l") : "N/A"}</p>
          </li>
        : null;
}

function PublishedDate(props: any) {
    return props.date
        ? <li className="list-group-item">
              <p>Published: {moment(props.date).format("l")}</p>
          </li>
        : null;
}

function License(props: any) {
    return props.license
        ? (props.license.descriptionUrl
            ? <li className="list-group-item">
                  <p>License: <a href={props.license.descriptionUrl}>{props.license.name}</a></p>
              </li>
            : <li className="list-group-item">
                  <p>License: {props.license.name}</p>
              </li>)
        : null;
}

function ViewUrl(props: any) {
    return props.url.indexOf("https://") === -1
        ? ViewUrlNotSecure()
        : props.url.indexOf("web.archive.org") === -1
            ? ViewUrlPrimary()
            : ViewUrlWayback();

    function ViewUrlPrimary() {
        return <a href={props.url}
                  className="btn btn-primary fl-btn-details-action"
                  title={`View ${props.name} in its raw format.`}>
                   View
               </a>;
    }

    function ViewUrlWayback() {
        return <a href={props.url}
                  className="btn btn-secondary fl-btn-details-action"
                  title={`Archive.org Mirror (Original Offline) - View ${props.name} in its raw format.`}>
                   View
               </a>;
    }

    function ViewUrlNotSecure() {
        return <a href={props.url}
                  className="btn btn-danger fl-btn-details-action"
                  title={`Not Secure - View ${props.name} in its raw format.`}>
                   View
               </a>;
    }
};

function ViewUrlMirror(props: any) {
    return props.url
        ? props.url.indexOf("https://") === -1
            ? ViewUrlNotSecure()
            : viewUrlSecondary()
        : null;

    function viewUrlSecondary() {
        return <a href={props.url}
                  className="btn btn-secondary fl-btn-details-action"
                  title={`Mirror - View ${props.name} in its raw format.`}>
                   View
               </a>;
    }

    function ViewUrlNotSecure() {
        return <a href={props.url}
                  className="btn btn-danger fl-btn-details-action"
                  title={`Mirror - Not Secure - View ${props.name} in its raw format.`}>
                   View
               </a>;
    }
};

function HomeUrl(props: any) {
    return props.url
        ? <a href={props.url} className="btn btn-primary fl-btn-details-action"
             title={`View the home page for ${props.name}.`}>
              Home
          </a>
        : null;
}

function PolicyUrl(props: any) {
    return props.url
        ? <a href={props.url} className="btn btn-primary fl-btn-details-action"
             title={`View the policy for which rules ${props.name} includes.`}>
              Policy
          </a>
        : null;
}

function DonateUrl(props: any) {
    return props.url
        ? <a href={props.url} className="btn btn-primary fl-btn-details-action"
             title={`Donate to support ${props.name}.`}>
              Donate
          </a>
        : null;
}

function IssuesUrl(props: any) {
    return props.url
        ? <a href={props.url} className="btn btn-primary fl-btn-details-action"
             title={`View the GitHub Issues for ${props.name}.`}>
              GH Issues
          </a>
        : null;
}

function ForumUrl(props: any) {
    return props.url
        ? <a href={props.url} className="btn btn-primary fl-btn-details-action"
             title={`View the forum for ${props.name}.`}>
              Forum
          </a>
        : null;
}

function ChatUrl(props: any) {
    return props.url
        ? <a href={props.url} className="btn btn-primary fl-btn-details-action"
             title={`Enter the chat room for ${props.name}.`}>
              Chat
          </a>
        : null;
}

function SubmissionUrl(props: any) {
    return props.url
        ? <a href={props.url} className="btn btn-primary fl-btn-details-action"
             title={`Submit a new rule to be included in ${props.name}.`}>
              Add Rule
          </a>
        : null;
}

function EmailAddress(props: any) {
    return props.email
        ? <a href={`mailto:${props.email}`} className="btn btn-primary fl-btn-details-action"
             title={`Email ${props.name}.`}>
              Email
          </a>
        : null;
}

function Maintainers(props: any) {
    return props.maintainers.length > 0
        ? <div className="w-100">
              {props.maintainers.map(
                  (maintainer: any) => <Maintainer maintainer={maintainer} key={maintainer.id.toString()}/>)}
          </div>
        : null;
}

function Maintainer(props: any) {
    return <div className="card">
               <div className="card-body">
                   <h3 className="card-header">Maintained by {props.maintainer.name}</h3>
                   <div className="container pt-1">
                       <div className="row">
                           <MaintainerAdditionalLists maintainer={props.maintainer}/>
                           <MaintainerUrls maintainer={props.maintainer}/>
                       </div>
                   </div>
               </div>
           </div>;
}

function MaintainerAdditionalLists(props: any) {
    return <div className="col-9">
               {props.maintainer.additionalLists.length > 0
                   ? <div>
                         <h4>More by {props.maintainer.name}:</h4>
                         <ul>
                             {props.maintainer.additionalLists.map(
                                 (list: any) => <MaintainerAdditionalList list={list} key={list.id.toString()}/>)}
                         </ul>
                     </div>
                   : null}
           </div>;
}

function MaintainerAdditionalList(props: any) {
    return <li>{props.list.name}</li>;
}

function MaintainerUrls(props: any) {
    return <div className="col-3 p-0 btn-group-vertical justify-content-start d-flex align-items-end" role="group">
               {props.maintainer.homeUrl
                   ? <a href={props.maintainer.homeUrl} className="btn btn-primary fl-btn-details-action"
                        title={`View the home page of ${props.maintainer.name}.`}>
                         Home
                     </a>
                   : null}
               {props.maintainer.emailAddress
                   ? <a href={`mailto:${props.maintainer.emailAddress}`}
                        className="btn btn-primary fl-btn-details-action"
                        title={`Email ${props.maintainer.name}.`}>
                         Email
                     </a>
                   : null}
               {props.maintainer.twitterHandle
                   ? <a href={`https://twitter.com/${props.maintainer.twitterHandle}`}
                        className="btn btn-primary fl-btn-details-action"
                        title={`View the Twitter page of ${props.maintainer.name}.`}>
                         Twitter
                     </a>
                   : null}
           </div>;
}

interface IFilterListDetailsDto {
    chatUrl: string;
    description: string;
    descriptionSourceUrl: string;
    discontinuedDate: string;
    donateUrl: string;
    emailAddress: string;
    forumUrl: string;
    homeUrl: string;
    issuesUrl: string;
    languages: string[];
    license: IListLicenseDto;
    maintainers: IListMaintainerDto[];
    policyUrl: string;
    publishedDate: string;
    ruleCount: number;
    submissionUrl: string;
    syntax: IListSyntaxDto[];
    tags: IListTagDto[];
    updatedDate: string;
    viewUrl: string;
    viewUrlMirror1: string;
    viewUrlMirror2: string;
}

interface IListLicenseDto {
    descriptionUrl: string;
    name: string;
}

interface IListMaintainerDto {
    id: number;
    emailAddress: string;
    homeUrl: string;
    name: string;
    twitterHandle: string;
    additionalLists: IMaintainerAdditionalListsDto[];
}

interface IMaintainerAdditionalListsDto {
    id: number;
    name: string;
}

interface IListSyntaxDto {
    definitionUrl: string;
    name: string;
    supportedSoftware: ISyntaxSupportedSoftwareDto[];
}

interface IListTagDto {
    name: string;
    colorHex: string;
    description: string;
}

interface ISyntaxSupportedSoftwareDto {
    homeUrl: string;
    name: string;
};