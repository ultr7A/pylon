import React from 'react';
import Icon from './icon.js';


export default class Emojis extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {

        };
    }
	render() {

		return (
			<aside className="emojis">
				{this.props.emojis}
			</aside>
		);
	}
}

Emojis.defaultProps = {
    name: 'main',
	emojis: "😀😬😁😂😃😄😅😆😇😉😊🙂🙃☺️😋😌😍😘😗😙😚😜😝😛🤑🤓😎🤗😏😶😐😑😒🙄🤔😳😞😟😠😡😔😕🙁☹️😣😖😫😩😤😮😱😨😰😯😦😧😢😥😪😓😭😵😲🤐😷🤒🤕😴💤💩😈👿👹👺💀👻👽🤖😺😸😹😻😼😽🙀😿😾🙌👏👋👍👊✊✌️👌✋💪🙏☝️👆👇👈👉🖕🤘🖖✍️💅👄👅👂👃👁👀👤🗣👶👦👧👨👩👱👴👵👲👳👮👷💂🕵🎅👼👸👰🚶🏃💃👯👫👬👭🙇💁🙅🙆🙋🙎🙍💇💆💑👩‍❤️‍👩👨‍❤️‍👨💏👩‍❤️‍💋‍👩👨‍❤️‍💋‍👨👪👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👚👕👖👔👗👙👘💄💋👣👠👡👢👞👟👒🎩⛑🎓👑🎒👝👛👜💼👓🕶💍🌂👦🏻👧🏻👨🏻👩🏻👴🏻👵🏻👶🏻👱🏻👮🏻👲🏻👳🏻👷🏻👸🏻💂🏻🎅🏻👼🏻💆🏻💇🏻👰🏻🙍🏻🙎🏻🙅🏻🙆🏻💁🏻🙋🏻🙇🏻🙌🏻🙏🏻🚶🏻🏃🏻💃🏻💪🏻👈🏻👉🏻☝️🏻👆🏻🖕🏻👇🏻✌️🏻🖖🏻🤘🏻🖐🏻✊🏻✋🏻👊🏻👌🏻👍🏻👎🏻👋🏻👏🏻👐🏻✍🏻💅🏻👂🏻👃🏻🚣🏻🛀🏻🏄🏻🏇🏻🏊🏻⛹🏻🏋🏻🚴🏻🚵🏻👦🏼👧🏼👨🏼👩🏼👴🏼👵🏼👶🏼👱🏼👮🏼👲🏼👳🏼👷🏼👸🏼💂🏼🎅🏼👼🏼💆🏼💇🏼👰🏼🙍🏼🙎🏼🙅🏼🙆🏼💁🏼🙋🏼🙇🏼🙌🏼🙏🏼🚶🏼🏃🏼💃🏼💪🏼👈🏼👉🏼☝️🏼👆🏼🖕🏼👇🏼✌️🏼🖖🏼🤘🏼🖐🏼✊🏼✋🏼👊🏼👌🏼👍🏼👎🏼👋🏼👏🏼👐🏼✍🏼💅🏼👂🏼👃🏼🚣🏼🛀🏼🏄🏼🏇🏼🏊🏼⛹🏼🏋🏼🚴🏼🚵🏼👦🏽👧🏽👨🏽👩🏽👴🏽👵🏽👶🏽👱🏽👮🏽👲🏽👳🏽👷🏽👸🏽💂🏽🎅🏽👼🏽💆🏽💇🏽👰🏽🙍🏽🙎🏽🙅🏽🙆🏽💁🏽🙋🏽🙇🏽🙌🏽🙏🏽🚶🏽🏃🏽💃🏽💪🏽👈🏽👉🏽☝️🏽👆🏽🖕🏽👇🏽✌️🏽🖖🏽🤘🏽🖐🏽✊🏽✋🏽👊🏽👌🏽👍🏽👎🏽👋🏽👏🏽👐🏽✍🏽💅🏽👂🏽👃🏽🚣🏽🛀🏽🏄🏽🏇🏽🏊🏽⛹🏽🏋🏽👦🏾👧🏾👨🏾👩🏾👴🏾👵🏾👶🏾👱🏾👮🏾👲🏾👳🏾👷🏾👸🏾💂🏾🎅🏾👼🏾💆🏾💇🏾👰🏾🙍🏾🙎🏾🙅🏾🙆🏾💁🏾🙋🏾🙇🏾🙌🏾🙏🏾🚶🏾🏃🏾💃🏾💪🏾👈🏾👉🏾☝️🏾👆🏾🖕🏾👇🏾✌️🏾🖖🏾🤘🏾🖐🏾✊🏾✋🏾👊🏾👌🏾👍🏾👎🏾👋🏾👏🏾👐🏾✍🏾💅🏾👂🏾👃🏾🚣🏾🛀🏾🏄🏾🏇🏾🏊🏾⛹🏾🏋🏾🚴🏾🚵🏾👦🏿👧🏿👨🏿👩🏿👴🏿👵🏿👶🏿👱🏿👮🏿👲🏿👳🏿👷🏿👸🏿💂🏿🎅🏿👼🏿💆🏿💇🏿👰🏿🙍🏿🙎🏿🙅🏿🙆🏿💁🏿🙋🏿🙇🏿🙌🏿🙏🏿🚶🏿🏃🏿💃🏿💪🏿👈🏿👉🏿☝️🏿👆🏿🖕🏿👇🏿✌️🏿🖖🏿🤘🏿🖐🏿✊🏿✋🏿👊🏿👌🏿👍🏿👎🏿👋🏿👏🏿👐🏿✍🏿💅🏿👂🏿👃🏿🚣🏿🛀🏿🏄🏿🏇🏿🏊🏿⛹🏿🏋🏿🚴🏿🚵🏿🐶🐱🐭🐹🐰🐻🐼🐨🐯🦁🐮🐷🐽🐸🐙🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🐺🐗🐴🦄🐝🐛🐌🐞🐜🕷🦂🦀🐍🐢🐠🐟🐡🐬🐳🐋🐊🐆🐅🐃🐂🐄🐪🐫🐘🐐🐏🐑🐎🐖🐀🐁🐓🦃🕊🐕🐩🐈🐇🐿🐾🐉🐲🌵🎄🌲🌳🌴🌱🌿☘🍀🎍🎋🍃🍂🍁🌾🌺🌻🌹🌷🌼🌸💐🍄🌰🎃🐚🕸🌎🌍🌏🌕🌖🌗🌘🌑🌒🌓🌔🌚🌝🌛🌜🌞🌙⭐️🌟💫✨☄☀️🌤⛅️🌥🌦☁️🌧⛈🌩⚡️🔥💥❄️🌨🔥💥❄️🌨☃️⛄️🌬💨🌪🌫☂️☔️💧💦🌊🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🍅🍆🌶🌽🍠🍯🍞🧀🍗🍖🍤🍳🍔🍟🌭🍕🍝🌮🌯🍜🍲🍥🍣🍱🍛🍙🍚🍘🍢🍡🍧🍨🍦🍰🎂🍮🍬🍭🍫🍿🍩🍪🍺🍻🍷🍸🍹🍾🍶🍵☕️🍼🍴🍽⚽️🏀🏈⚾️🎾🏐🏉🎱⛳️🏌🏓🏸🏒🏑🏏🎿⛷🏂⛸🏹🎣🚣🏊🏄🛀⛹🏋🚴🚵🏇🕴🏆🎽🏅🎖🎗🏵🎫🎟🎭🎨🎪🎤🎧🎼🎹🎷🎺🎸🎻🎬🎮👾🎯🎲🎰🎳🚗🚕🚙🚌🚎🏎🚓🚑🚒🚐🚚🚛🚜🏍🚲🚨🚔🚍🚘🚖🚡🚠🚟🚃🚋🚝🚄🚅🚈🚞🚂🚆🚇🚊🚉🚁🛩✈️🛫🛬⛵️🛥🚤⛴🛳🚀🛰💺⚓️🚧⛽️🚏🚦🚥🏁🚢🎡🎢🎠🏗🌁🗼🏭⛲️🎑⛰🏔🗻🌋🗾🏕⛺️🏞🛣🛤🌅🌄🏜🏖🏝🌇🌆🏙🌃🌉🌌🌠🎇🎆🌈🏘🏰🏯🏟🗽🏠🏡🏚🏢🏬🏣🏤🏥🏦🏨🏪🏫🏩💒🏛⛪️🕌🕍🕋⛩⌚️📱📲💻⌨🖥🖨🖱🖲🕹🗜💽💾💿📀📼📷📸📹🎥📽🎞📞☎️📟📠📺📻🎙🎚🎛⏱⏲⏰🕰⏳⌛️📡🔋🔌💡🔦🕯🗑🛢💸💵💴💶💷💰💳💎⚖🔧🔨⚒🛠⛏🔩⚙⛓🔫💣🔪🗡⚔🛡🚬☠⚰⚱🏺🔮📿💈⚗🔭🔬🕳💊💉🌡🏷🔖🚽🚿🛁🔑🗝🛋🛌🛏🚪🛎🖼🗺⛱🗿🛍🎈🎏🎀🎁🎊🎉🎎🎐🎌🏮✉️📩📨📧💌📮📪📫📬📭📦📯📥📤📜📃📑📊📈📉📄📅📆🗓📇🗃🗳🗄📋🗒📁📂🗂🗞📰📓📕📗📘📙📔📒📚📖🔗📎🖇✂️📐📏📌📍🚩🏳🏴🔐🔒🔓🔏🖊🖊🖋✒️📝✏️🖍🖌🔍🔎❤️💛💙💜💔❣️💕💞💓💗💖💘💝💟☮✝️☪🕉☸✡️🔯🕎☯️☦🛐⛎♈️♉️♊️♋️♌️♍️♎️♏️♐️♑️♒️♓️🆔⚛🈳🈹☢☣📴📳🈶🈚️🈸🈺🈷️✴️🆚🉑💮🉐㊙️㊗️🈴🈵🈲🅰️🅱️🆎🆑🅾️🆘⛔️📛🚫❌⭕️💢♨️🚷🚯🚳🚱🔞📵❗️❕❓❔‼️⁉️💯🔅🔆🔱⚜〽️⚠️🚸🔰♻️🈯️💹❇️✳️❎✅💠🌀➿🌐Ⓜ️🏧🈂️🛂🛃🛄🛅♿️🚭🚾🅿️🚰🚹🚺🚼🚻🚮🎦📶🈁🆖🆗🆙🆒🆕🆓0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟🔢▶️⏸⏯⏹⏺⏭⏮⏩⏪🔀🔁🔂◀️🔼🔽⏫⏬➡️⬅️⬆️⬇️↗️↘️↙️↖️↕️↔️🔄↪️↩️⤴️⤵️#️⃣*️⃣ℹ️🔤🔡🔠🔣🎵🎶〰️➰✔️🔃➕➖➗✖️💲💱©️®️™️🔚🔙🔛🔝🔜☑️🔘⚪️⚫️🔴🔵🔸🔹🔶🔷🔺▪️▫️⬛️⬜️🔻◼️◻️◾️◽️🔲🔳🔈🔉🔊🔇📣📢🔔🔕🃏🀄️♠️♣️♥️♦️🎴🗨💭🗯💬🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧"
};



