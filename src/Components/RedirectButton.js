import { useNavigate } from "react-router-dom";

export default function RedirectButton({ name, redirectTo, className, style }) {
    const navigate = useNavigate();

    return (
        <div>
            <button
                className={ className }
                style={ style }
                onClick={() => {
                    navigate(redirectTo);
                }}
            >
                { name }
            </button>
        </div>
    );
}
