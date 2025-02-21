import { Button } from "../../../components/ui/button";
import UserRole from "../../../Constants/Role";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/features/users/users";

const Customers = () => {
  const { data: usersResult } = useGetUsersQuery(undefined);
  const users = usersResult?.data?.filter((singleUser) => singleUser.userType!==UserRole.admin)
  const [deactivateUser] = useUpdateUserMutation();

  function getFormattedDate(isoString: string, timeZone: string = "UTC") {
    const date = new Date(isoString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone,
    });
  }
  return (
    <div className="font-inter">
      {" "}
      <div className="overflow-x-auto">
        <table className="table border border-black">
          <thead>
            <tr className="text-base text-black text-center font-orbitron">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Registered Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr
                key={idx}
                className="text-base text-black text-center  hover:bg-gray-100 "
              >
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={
                          user.profileImg ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="">{getFormattedDate(user.createdAt)}</td>
                <td className="">
                  <Button
                    onClick={() =>
                      deactivateUser({
                        email: user?.email,
                        data: { accountStatus: !user.accountStatus }, 
                      })
                    }
                    className={`text-black bg-transparent border border-gray-600 hover:text-white  ${!user.accountStatus ?'hover:bg-green-600 hover:border-green-600':'hover:bg-red-600 hover:border-red-600' }`}
                  >
                    {user.accountStatus ? "Deactivate" : "Activate"}

                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
