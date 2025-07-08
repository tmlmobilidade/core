/* * */

const main: React.CSSProperties = {
	backgroundColor: '#F0F0F0',
	padding: '10px 0',
};

const container: React.CSSProperties = {
	backgroundColor: '#fff',
	border: '1px solid #E1E1E6',
	padding: '45px',
};

const text: React.CSSProperties = {
	color: '#000',
	fontFamily: '\'Open Sans\', \'Helvetica Neue\', Arial',
	fontSize: '16px',
	fontWeight: '300',
	lineHeight: '26px',
};

const footer_text: React.CSSProperties = {
	color: '#646482',
	fontFamily: '\'Open Sans\', \'Helvetica Neue\', Arial',
	fontSize: '12px',
	fontWeight: '300',
	lineHeight: '18px',
	textAlign: 'center',
};

const button: React.CSSProperties = {
	backgroundColor: '#ffdc00',
	borderRadius: '4px',
	boxShadow: '2px 2px 3px 0px rgba(0, 0, 0, 0.1)',
	color: '#000',
	display: 'block',
	fontFamily: '\'Open Sans\', \'Helvetica Neue\', Arial',
	fontSize: '15px',
	padding: '14px 7px',
	textAlign: 'center' as const,
	textDecoration: 'none',
	width: '210px',
};

export default {
	button,
	container,
	footer_text,
	main,
	text,
};
