# TagLite

A lightweight, dependency-free React tag input component built with TypeScript.

`SimpleTagInput` is a small and customizable component for creating, validating, normalizing, removing, and clearing tags while keeping the tag value fully controlled by the parent component.

## Features

- Fully controlled `value` with `onChange`
- TypeScript-first API
- Zero runtime dependencies
- Lightweight and performance-conscious implementation
- Customizable themes
- Custom tag and remove icons
- Configurable keyboard separators
- Maximum tag limit
- Optional duplicate tags
- Tag normalization
- Tag validation with validation reasons
- `onTagAdd`, `onTagRemove`, and `onInvalidTag` callbacks
- Optional add-on-blur behavior
- Multi-tag paste parsing
- Optional clear-all button
- `readOnly` and `disabled` support
- Forwarded ref to the native `<input>`
- Native input attributes supported through `InputHTMLAttributes<HTMLInputElement>`

## Installation

```bash
npm install taglite
```

Or:

```bash
yarn add taglite
```

```bash
pnpm add taglite
```

## Basic Usage

```tsx
import { useState } from 'react'
import { SimpleTagInput } from 'taglite'
import 'taglite/style.css'

export default function Example() {
    const [tags, setTags] = useState<string[]>([])

    return (
        <SimpleTagInput
            value={tags}
            onChange={setTags}
        />
    )
}
```

The component is controlled through `value` and `onChange`. The tag array is never stored internally.

The text currently being typed inside the input is temporary UI state and is managed internally by the component.

---

## How Tags Are Added

By default, pressing `Enter` or `,` converts the current input into a tag.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
/>
```

Examples:

```text
React + Enter  →  React
Next.js + ,    →  Next.js
```

Empty values are ignored.

---

## Props

### `value`

```ts
value: string[]
```

The current controlled list of tags.

```tsx
const [tags, setTags] = useState<string[]>([
    'React',
    'Next.js',
])

<SimpleTagInput
    value={tags}
    onChange={setTags}
/>
```

This is the source of truth for the component.

---

### `onChange`

```ts
onChange: (tags: string[]) => void
```

Called whenever the tag list changes.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
/>
```

The component does not mutate the existing array.

---

### `direction`

```ts
direction?: 'ltr' | 'rtl'
```

Controls the text direction of the component.

Default:

```ts
direction = 'ltr'
```

LTR:

```tsx
<SimpleTagInput
    direction="ltr"
    value={tags}
    onChange={setTags}
/>
```

RTL:

```tsx
<SimpleTagInput
    direction="rtl"
    value={tags}
    onChange={setTags}
/>
```

Useful for Persian, Arabic, Hebrew, and other RTL interfaces.

---

### `theme`

```ts
theme?:
    | 'default'
    | 'light'
    | 'dark'
    | 'cupcake'
    | 'emerald'
    | 'corporate'
    | 'retro'
    | 'dracula'
```

Changes the built-in visual theme.

Default:

```ts
theme = 'light'
```

Examples:

```tsx
<SimpleTagInput
    theme="light"
    value={tags}
    onChange={setTags}
/>
```

```tsx
<SimpleTagInput
    theme="dark"
    value={tags}
    onChange={setTags}
/>
```

```tsx
<SimpleTagInput
    theme="dracula"
    value={tags}
    onChange={setTags}
/>
```

Available themes:

- `default` — backward-compatible alias of `light`
- `light`
- `dark`
- `cupcake`
- `emerald`
- `corporate`
- `retro`
- `dracula`

---

### `placeholder`

```ts
placeholder?: string
```

Placeholder displayed inside the input.

Default:

```text
Add a new tag...
```

Example:

```tsx
<SimpleTagInput
    placeholder="Add technology..."
    value={tags}
    onChange={setTags}
/>
```

---

### `hintText`

```ts
hintText?: ReactNode
```

Content displayed in the helper area below the input when the component is focused.

Default:

```text
Press Enter to add a tag
```

Example:

```tsx
<SimpleTagInput
    hintText="Press Enter or comma to add a tag"
    value={tags}
    onChange={setTags}
/>
```

It also accepts JSX:

```tsx
<SimpleTagInput
    hintText={<span>Add your technology tags</span>}
    value={tags}
    onChange={setTags}
/>
```

---

### `separators`

```ts
separators?: string[]
```

Defines which keyboard keys should create a tag.

Default:

```ts
['Enter', ',']
```

Example — Enter only:

```tsx
<SimpleTagInput
    separators={['Enter']}
    value={tags}
    onChange={setTags}
/>
```

Example — Enter and Tab:

```tsx
<SimpleTagInput
    separators={['Enter', 'Tab']}
    value={tags}
    onChange={setTags}
/>
```

Example — semicolon instead of comma:

```tsx
<SimpleTagInput
    separators={['Enter', ';']}
    value={tags}
    onChange={setTags}
/>
```

The values correspond to `KeyboardEvent.key` values. For example, the Enter key is `'Enter'`, while a comma is `','`.

---

### `maxTags`

```ts
maxTags?: number
```

Limits the maximum number of tags that can be added.

```tsx
<SimpleTagInput
    maxTags={5}
    value={tags}
    onChange={setTags}
/>
```

Once the limit is reached, additional tags are ignored.

Existing tags are never removed automatically.

---

### `allowDuplicates`

```ts
allowDuplicates?: boolean
```

Controls whether duplicate tags are allowed.

Default:

```ts
allowDuplicates = false
```

Duplicates disabled:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    allowDuplicates={false}
/>
```

Duplicates enabled:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    allowDuplicates
/>
```

With `allowDuplicates={false}`:

```text
React
React
React
```

results in one `React` tag.

With `allowDuplicates` enabled, all three can be added.

---

### `normalizeTag`

```ts
normalizeTag?: (tag: string) => string
```

Transforms a tag before it is validated and added.

Example — trim and lowercase:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    normalizeTag={tag => tag.trim().toLowerCase()}
/>
```

Input:

```text
  REACT
```

Result:

```text
react
```

Normalization happens before duplicate checking, so this also works as expected:

```text
React
react
REACT
```

when using:

```tsx
normalizeTag={tag => tag.toLowerCase()}
```

with `allowDuplicates={false}`.

---

### `validateTag`

```ts
validateTag?: (tag: string) => boolean | string
```

Validates a normalized tag before adding it.

Return `true` to accept the tag:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    validateTag={tag => tag.length >= 3}
/>
```

Return `false` to reject it:

```tsx
validateTag={tag => tag.length >= 3}
```

Or return a string to reject it and provide a reason:

```tsx
validateTag={tag =>
    tag.length >= 3
        ? true
        : 'Tag must contain at least 3 characters'
}
```

Validation runs after `normalizeTag`.

---

### `onInvalidTag`

```ts
onInvalidTag?: (
    tag: string,
    reason?: string,
) => void
```

Called when `validateTag` rejects a tag.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    validateTag={tag =>
        tag.length >= 3
            ? true
            : 'Tag is too short'
    }
    onInvalidTag={(tag, reason) => {
        console.log(tag)
        console.log(reason)
    }}
/>
```

For a validator returning `false`, `reason` is `undefined`.

For a validator returning a string, that string is passed as the reason.

---

### `onTagAdd`

```ts
onTagAdd?: (
    tag: string,
    index: number,
) => void
```

Called only after a tag has successfully passed processing and has been added.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    onTagAdd={(tag, index) => {
        console.log('Added:', tag)
        console.log('Index:', index)
    }}
/>
```

The callback receives the final normalized tag and its resulting index.

It is not called for empty, invalid, duplicate, or max-limit-rejected tags.

---

### `onTagRemove`

```ts
onTagRemove?: (
    tag: string,
    index: number,
) => void
```

Called when a tag is removed.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    onTagRemove={(tag, index) => {
        console.log('Removed:', tag)
        console.log('Index:', index)
    }}
/>
```

It is triggered by both:

- clicking a tag's remove button
- pressing Backspace while the input is empty

The index represents the tag's index before removal.

---

### `acceptOnBlur`

```ts
acceptOnBlur?: boolean
```

Automatically attempts to add the current input as a tag when the input loses focus.

Default:

```ts
acceptOnBlur = false
```

Example:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    acceptOnBlur
/>
```

Typing:

```text
React
```

and clicking outside the component adds `React` without requiring Enter.

The same normalization, validation, duplicate, and `maxTags` rules are used as normal tag creation.

---

### `clearable`

```ts
clearable?: boolean
```

Shows a clear-all button when at least one tag exists.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    clearable
/>
```

Clicking the button calls:

```ts
onChange([])
```

Example with `onClear`:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    clearable
    onClear={() => {
        console.log('All tags cleared')
    }}
/>
```

---

### `onClear`

```ts
onClear?: () => void
```

Called after the clear-all action is accepted.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    clearable
    onClear={() => console.log('Cleared')}
/>
```

---

### `tagIcon`

```ts
tagIcon?: ReactNode
```

Replaces the built-in tag icon.

```tsx
import { Hash } from 'lucide-react'

<SimpleTagInput
    value={tags}
    onChange={setTags}
    tagIcon={<Hash className="size-3" />}
/>
```

A runtime icon dependency is not required by `taglite`; the example above only demonstrates that any React node can be supplied.

You can also use your own SVG:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    tagIcon={
        <svg viewBox="0 0 24 24" aria-hidden="true">
            {/* ... */}
        </svg>
    }
/>
```

---

### `removeIcon`

```ts
removeIcon?: ReactNode
```

Replaces the default remove icon inside every tag.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    removeIcon={<span aria-hidden="true">×</span>}
/>
```

---

### `clearIcon`

```ts
clearIcon?: ReactNode
```

Replaces the built-in clear-all icon.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    clearable
    clearIcon={<span aria-hidden="true">×</span>}
/>
```

---

### `removeButtonProps`

```ts
removeButtonProps?: {
    className?: string
    [key: string]: unknown
}
```

Provides additional attributes for the remove buttons rendered inside tags.

Example:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    removeButtonProps={{
        title: 'Remove tag',
        className: 'text-red-500',
    }}
/>
```

The component keeps control over the button's type, click handler, disabled state, and core behavior.

---

## `readOnly`

`readOnly` is inherited from the native input attributes.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    readOnly
/>
```

In read-only mode:

- new tags cannot be added
- existing tags cannot be removed
- Backspace does not remove the last tag
- blur does not add a tag
- the clear-all action is disabled

The input can still be focused.

---

## `disabled`

`disabled` is inherited from the native input attributes.

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    disabled
/>
```

In disabled mode:

- the input is disabled
- tags cannot be added
- tags cannot be removed
- clear-all is disabled
- keyboard tag actions are disabled
- the component does not force focus onto the disabled input

---

## Native Input Props

`SimpleTagInput` extends `InputHTMLAttributes<HTMLInputElement>`, so standard input attributes are supported unless they conflict with the controlled tag API.

Examples:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    name="tags"
    id="project-tags"
    autoComplete="off"
    autoFocus
    required
/>
```

The following are intentionally controlled by `SimpleTagInput` and are not treated as native input values:

```ts
value
onChange
```

---

## Forwarded Ref

The component forwards its ref directly to the underlying native `<input>` element.

```tsx
import { useRef } from 'react'
import { SimpleTagInput } from 'taglite'

export default function Example() {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <SimpleTagInput
                ref={inputRef}
                value={tags}
                onChange={setTags}
            />

            <button
                type="button"
                onClick={() => inputRef.current?.focus()}
            >
                Focus input
            </button>
        </>
    )
}
```

This is useful for forms, dialogs, keyboard shortcuts, and programmatic focus management.

---

## Paste Multiple Tags

Pasting delimited text can create multiple tags at once.

Example input:

```text
React, Next.js, TypeScript
```

results in:

```ts
['React', 'Next.js', 'TypeScript']
```

Newline-separated text is also supported:

```text
React
Next.js
TypeScript
```

Multiple lines and commas can be mixed:

```text
React, Next.js
TypeScript, Tailwind CSS
```

The same processing pipeline is used for pasted tags:

```text
normalize → validate → duplicate check → maxTags → onChange
```

Example with normalization:

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    normalizeTag={tag => tag.trim().toLowerCase()}
/>
```

Pasting:

```text
 React, NEXT.JS, TypeScript
```

produces:

```ts
['react', 'next.js', 'typescript']
```

---

## Combining Features

A more complete example:

```tsx
import { useState } from 'react'
import { SimpleTagInput } from 'taglite'

export default function Example() {
    const [tags, setTags] = useState<string[]>([])

    return (
        <SimpleTagInput
            value={tags}
            onChange={setTags}
            placeholder="Add a technology..."
            hintText="Enter, comma, or paste multiple tags"
            separators={['Enter', ',']}
            maxTags={8}
            allowDuplicates={false}
            normalizeTag={tag =>
                tag.trim().toLowerCase()
            }
            validateTag={tag =>
                tag.length >= 2
                    ? true
                    : 'Tag must contain at least 2 characters'
            }
            onInvalidTag={(tag, reason) => {
                console.log('Invalid tag:', tag, reason)
            }}
            onTagAdd={(tag, index) => {
                console.log('Added:', tag, index)
            }}
            onTagRemove={(tag, index) => {
                console.log('Removed:', tag, index)
            }}
            acceptOnBlur
            clearable
            onClear={() => {
                console.log('All tags cleared')
            }}
            theme="dark"
        />
    )
}
```

---

## Common Patterns

### Technology tags

```tsx
<SimpleTagInput
    value={technologies}
    onChange={setTechnologies}
    placeholder="Add technology..."
    normalizeTag={tag => tag.trim()}
    maxTags={10}
/>
```

### Product keywords

```tsx
<SimpleTagInput
    value={keywords}
    onChange={setKeywords}
    placeholder="Add keyword..."
    allowDuplicates={false}
/>
```

### RTL / Persian

```tsx
<SimpleTagInput
    direction="rtl"
    theme="light"
    value={tags}
    onChange={setTags}
    placeholder="برچسب جدید..."
    hintText="برای افزودن برچسب Enter را بزنید"
/>
```

### Strict validation

```tsx
<SimpleTagInput
    value={tags}
    onChange={setTags}
    validateTag={tag =>
        /^[a-z0-9-]+$/i.test(tag)
            ? true
            : 'Only letters, numbers, and hyphens are allowed'
    }
/>
```

---

## Accessibility

The component uses native HTML controls and provides accessible labeling for tag removal buttons.

For example, the default remove button receives an accessible label based on the tag name.

```text
Remove tag React
```

When replacing icons with custom React nodes, keep decorative icons `aria-hidden` when the icon itself does not provide information.

For form-level labels, descriptions, and validation messages, use your application's form/field structure around the component rather than duplicating field abstractions inside `SimpleTagInput`.

---

## Performance

`taglite` is designed to stay small and lightweight:

- no runtime dependencies
- inline SVG icons instead of an icon package
- controlled tag state managed by the parent
- memoized tag rendering
- cached theme styles
- simple array operations for normal add/remove flows
- no animation library
- no built-in network or asynchronous logic

For large tag collections, keep the `value` reference stable when the tags themselves have not changed.

---

## TypeScript

The package is designed for TypeScript projects and exposes its public types.

```tsx
import {
    SimpleTagInput,
    type SimpleTagInputProps,
    type SimpleTagInputTheme,
} from 'taglite'
```

Example:

```ts
const theme: SimpleTagInputTheme = 'dracula'

const props: SimpleTagInputProps = {
    value: [],
    onChange: tags => {
        console.log(tags)
    },
    theme,
}
```

---

## API Summary

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string[]` | required | Controlled tag list |
| `onChange` | `(tags: string[]) => void` | required | Called when tags change |
| `direction` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |
| `theme` | `ProductTagsInputTheme` | `'light'` | Built-in visual theme |
| `placeholder` | `string` | `'Add a new tag...'` | Input placeholder |
| `hintText` | `ReactNode` | `'Press Enter to add a tag'` | Focus helper text |
| `separators` | `string[]` | `['Enter', ',']` | Keys that create tags |
| `maxTags` | `number` | — | Maximum number of tags |
| `allowDuplicates` | `boolean` | `false` | Allow duplicate tags |
| `normalizeTag` | `(tag: string) => string` | — | Normalizes tags before validation |
| `validateTag` | `(tag: string) => boolean \| string` | — | Validates tags |
| `onInvalidTag` | `(tag, reason?) => void` | — | Called for validation failures |
| `onTagAdd` | `(tag, index) => void` | — | Called after a tag is added |
| `onTagRemove` | `(tag, index) => void` | — | Called after a tag is removed |
| `acceptOnBlur` | `boolean` | `false` | Add current input on blur |
| `clearable` | `boolean` | `false` | Show clear-all button |
| `clearIcon` | `ReactNode` | built-in SVG | Custom clear icon |
| `onClear` | `() => void` | — | Called after clearing all tags |
| `tagIcon` | `ReactNode` | built-in SVG | Custom tag icon |
| `removeIcon` | `ReactNode` | built-in SVG | Custom remove icon |
| `removeButtonProps` | button attributes | — | Additional remove-button attributes |
| `readOnly` | native input prop | `false` | Prevent tag editing |
| `disabled` | native input prop | `false` | Disable interaction |
| `ref` | `Ref<HTMLInputElement>` | — | Ref to the native input |

### Native input attributes

The component also accepts the standard `InputHTMLAttributes<HTMLInputElement>` props, excluding the controlled `value` and tag-level `onChange` API.

---

## Design Philosophy

`SimpleTagInput` intentionally focuses on the core tag-input experience instead of becoming a full autocomplete or drag-and-drop system.

The goal is a small component with:

- a simple API
- zero runtime dependencies
- predictable controlled behavior
- useful customization hooks
- good keyboard and paste support
- minimal runtime overhead

---

## License

MIT
