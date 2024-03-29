import React from 'react';
import Icon from './icon.js';

export default class FileContextMenu extends React.Component {
	constructor() {
		super();
        this.state = {
			expanded: false
		}
    }
    configure() {
    	// When there's a change in the state, the component and all its sub-components get updated.
        this.setState({expanded: !this.state.expanded});
    }
	render(){
		var comp = this,
        menuStyle = {  },
        optionsStyle = {
            height: this.state.expanded ? "auto" : 0+"px"
        };

		return (
			<div className="file-context-menu" style={menuStyle}>
				<Icon src="/images/dark/configure.png" title="Options" open={(evt)=>{comp.configure();}} />
                <ul className="context-options" style={optionsStyle}>
				{this.props.options.map(function(option, i) {
				 	var src = option.src;
				 	if (option.title == "Open" && src.search(".") > 1 ) {
				 		return;
					}
				 	if (!! comp.props.theme && comp.props.theme == "light") {
						src = src.replace("/dark", "");
					}
                    return <li key={i}><Icon src={src} text={option.text} title={option.title} open={(evt)=>{option.open(evt, comp);}} /></li>;
                })}
                </ul>
			</div>
		);
	}
}

FileContextMenu.defaultProps = {
	name: 'main',
	file_id: "",
	filename: "",
	link: "",
	images: /(\.jpg|\.jpeg|\.png|\.webp)$/i,
	documents: /(\.txt|\.text|\.tx|\.md|\.js|\.css|\.html|\.htm|\.jsx|\.sh)$/i,
	multimedia: /(\.gif|\.webm|\.mp4|\.ogg|\.wav|\.midi)$/i,
	options: [
		{
			src: "/images/dark/download.png", title: "Save", text: "Download",
			open: function(evt, comp){
				console.log("downloading file..");
				if (comp.props.link.length > 0) {
					window.location.href = comp.props.link;
				}
			}
		},
		{src: "/images/dark/folder.png", title: "Open", text: "Open", open: function(){ alert("not implemented"); console.log("opening Files app.."); } },
		{src: "/images/dark/edit.png", title: "Edit", text: "Edit", open: function(){ alert("not implemented"); console.log("opening appropriate editing app.."); } },
		{src: "/images/dark/sharing.png", title: "Share", text: "Share", open: function(){ alert("not implemented"); console.log("opening sharing app.."); } },
		{src: "/images/dark/x.png", title: "Delete", text: "Delete", open:
		function (evt, comp) {
			console.log("deleting file..");
			var configure = {
				baseURL: 'https://vpylon.net',
				timeout: 1000,
				headers: {'x-access-token': localStorage.getItem("token")}
			};
			axios.delete('/api/files/'+comp.props.file_id, configure)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (response) {
				console.log(response);
			});
		}
	},
	{src: "/images/dark/configure.png", title: "Options", text: "Options", open: function(evt, menu){
		console.log(menu.props.file_id);
		app.systemEvents.emit("toggle-applet-view", {visible: true});
		app.systemEvents.emit("open-applet", {name: "file-properties", key:"File Properties | "+menu.props.file_id, file_id: menu.props.file_id, data:{filename: menu.props.filename}});
		console.log("Open File Properties Applet");
	} }
]
};
//        { src: "/images/dark/x.png", title: "Delete", text: "", open: function(evt, menu) {
//                console.log("deleting file");
//            }
//        }
