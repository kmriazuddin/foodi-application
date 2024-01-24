import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Profile = ({ user }) => {
    const { logOut } = useContext(AuthContext);

    // LogOut
    const handleLogout = () => {
        logOut().then(() => {
            // Sign-out successful.
            toast.success("Logout Successfully!")
        }).catch((error) => {
            // An error happened.
            toast.error("Error", error)
        });
    }
return (
    <div>
        <div className="drawer z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full border border-rose-400">
                        <img alt="Not Found" src={user.photoURL} />
                    </div>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-52 md:w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link to="/updateProfile">Profile</Link></li>
                    <li><a>Order</a></li>
                    <li><a>Setting</a></li>
                    <li><a onClick={handleLogout}>Log Out</a></li>
                </ul>
            </div>
        </div>
    </div>
);
};

export default Profile;