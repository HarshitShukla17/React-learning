import { Outlet,Link,useLoaderData,Form,redirect,NavLink,useNavigation,useSubmit} from "react-router-dom";
import { getContacts,createContact } from "../contacts";
import { useEffect } from "react";

export async function action() {
  const contact = await createContact();
  return redirect(`contacts/${contact.id}/edit`)
}

export default function Root() {
  const {contacts,q}=useLoaderData()
  const navigation = useNavigation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    
  const submit=useSubmit()
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
    return (
      <>
        <div id="sidebar">
          <h1>Harshit Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                className={searching ? "loading" : ""}
                defaultValue={q}
                onChange={(e)=>{
                  const isFirstSearch=q==null
                  submit(e.currentTarget.form,{replace:!isFirstSearch})}}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              {/* here form willwe created.. */}
            <button type="submit">New</button>
          </Form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}
                  className={({ isActive, isPending }) =>
                  isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                }>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"
        className={navigation.state === "loading" ? "loading" : ""}>
          <Outlet />
        </div>
      </>
    );
  }

  export async function dloader({request})
  {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts,q };
  }