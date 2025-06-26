# Sample Object to set

```bash
const [newDataset, setNewDataset] = useState({
  name: '',
  ownerTenantId: '',
  sharedWithTenants: [] as string[],
});
```

# Usage MultiSelectTextField

```bash
<MultiSelectTextField
  label="Shared to Other Tenant"
  data={tenantOptions}
  onChange={(selected) => {
    const selectedValues = selected.map((s) => s.value);
      setNewDataset((prev) => ({
        ...prev,
        sharedWithTenants: selectedValues,
      }));
  }}
/>
```

# Usage SingleSelectTextField

```bash
<SingleSelectTextField
  label="Select Dataset Owner Tenant"
  data={tenantOptions}
  value={tenantOptions.find((o) => o.value === newDataset.ownerTenantId.toString())}
  onChange={(selected) =>
    setNewDataset((prev) => ({
      ...prev,
      ownerTenantId: selected?.value || '',
    }))
  }
/>
```
