import './footer.css';

// const date = Date().getFullYear;

export default function Footer() {

    return(
        <footer className='main'>
            <div className='footer'>
                <div className='each'>
                    <h4 className='h4'>Omozon</h4>
                    <p className='p'>I an online shop to be proud of</p>
                </div>
                <div className='each'>
                    <h4>POLICY INFO</h4>
                    <p>Privacy Policy</p>
                    <p>Terms of Use</p>
                    <p>Terms of Sale</p>
                    <p>Report Abuse</p>
                </div>
                <div className='each'>
                    <h4>SUBSCRIBE</h4>
                    <form>
                        <span className='contain_input'>
                            <input className='input_footer' type='email' placeholder='Enter email' />
                            <input className='input_btn' type='submit' />
                        </span>
                    </form>
                    <p>Subscribe to receive new products update</p>
                </div>
            </div>
            <h5 className='center'>&copy; Copyrighted Omozon 2022</h5>
        </footer>
    );
}
