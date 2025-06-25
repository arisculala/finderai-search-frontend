## Usage

```bash
<CollapsibleContainer
  headerText="User Settings"
  icon={<FontAwesomeIcon icon={faUser} />}
  initiallyExpanded={true}
>
  <div>
    <p>Welcome to your user settings.</p>
    <ul className="list-disc pl-4 mt-2 text-sm">
      <li>Change password</li>
      <li>Enable 2FA</li>
      <li>Update profile</li>
    </ul>
  </div>
</CollapsibleContainer>

```
