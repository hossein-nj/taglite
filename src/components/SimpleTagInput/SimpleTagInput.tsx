import {
    forwardRef,
    memo,
    useRef,
    useState,
    type ChangeEvent,
    type ClipboardEvent,
    type CSSProperties,
    type FocusEvent,
    type KeyboardEvent,
    type SVGProps,
} from 'react'

import type {
    SimpleTagInputProps,
    SimpleTagInputTheme,
} from './SimpleTagInput.types'

type IconProps = SVGProps<SVGSVGElement>

type ThemeVariables = {
    background: string
    backgroundHover: string

    border: string
    borderFocus: string
    ring: string

    text: string
    placeholder: string
    mutedText: string

    tagBackground: string
    tagBorder: string
    tagText: string
    tagHoverBackground: string
    tagHoverBorder: string

    removeText: string
    removeHoverBackground: string
    removeHoverText: string

    radius: string
    tagRadius: string

    shadow: string
    focusShadow: string
}

const lightTheme: ThemeVariables = {
    background: '#ffffff',
    backgroundHover: '#ffffff',

    border: '#d1d5db',
    borderFocus: '#111827',
    ring: 'rgba(17, 24, 39, 0.10)',

    text: '#111827',
    placeholder: '#9ca3af',
    mutedText: '#9ca3af',

    tagBackground: '#f3f4f6',
    tagBorder: '#e5e7eb',
    tagText: '#374151',
    tagHoverBackground: '#e5e7eb',
    tagHoverBorder: '#d1d5db',

    removeText: '#6b7280',
    removeHoverBackground: '#e5e7eb',
    removeHoverText: '#111827',

    radius: '1rem',
    tagRadius: '1rem',

    shadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
    focusShadow:
        '0 0 0 3px rgba(17, 24, 39, 0.10)',
}

const themes: Record<
    SimpleTagInputTheme,
    ThemeVariables
> = {
    default: lightTheme,
    light: lightTheme,

    dark: {
        background: '#111827',
        backgroundHover: '#111827',

        border: '#374151',
        borderFocus: '#f9fafb',
        ring: 'rgba(249, 250, 251, 0.10)',

        text: '#f9fafb',
        placeholder: '#6b7280',
        mutedText: '#6b7280',

        tagBackground: '#1f2937',
        tagBorder: '#374151',
        tagText: '#e5e7eb',
        tagHoverBackground: '#374151',
        tagHoverBorder: '#4b5563',

        removeText: '#9ca3af',
        removeHoverBackground: '#374151',
        removeHoverText: '#f9fafb',

        radius: '1rem',
        tagRadius: '1rem',

        shadow: '0 1px 2px rgba(0, 0, 0, 0.30)',
        focusShadow:
            '0 0 0 3px rgba(249, 250, 251, 0.10)',
    },

    cupcake: {
        background: '#fff7f3',
        backgroundHover: '#fffaf7',

        border: '#f0c8c0',
        borderFocus: '#e6a89c',
        ring: 'rgba(230, 168, 156, 0.20)',

        text: '#5c4b51',
        placeholder: '#a9959c',
        mutedText: '#a9959c',

        tagBackground: '#f9dfe5',
        tagBorder: '#efc4ce',
        tagText: '#7b4f5b',
        tagHoverBackground: '#f6d2da',
        tagHoverBorder: '#e8b4c0',

        removeText: '#a86b78',
        removeHoverBackground: '#efc4ce',
        removeHoverText: '#693f4b',

        radius: '1rem',
        tagRadius: '1rem',

        shadow:
            '0 2px 8px rgba(92, 75, 81, 0.06)',
        focusShadow:
            '0 0 0 3px rgba(230, 168, 156, 0.20)',
    },

    emerald: {
        background: '#ffffff',
        backgroundHover: '#fafffd',

        border: '#a7d8c5',
        borderFocus: '#10b981',
        ring: 'rgba(16, 185, 129, 0.14)',

        text: '#163c31',
        placeholder: '#7ca396',
        mutedText: '#7ca396',

        tagBackground: '#dff7ec',
        tagBorder: '#b8ead4',
        tagText: '#087f5b',
        tagHoverBackground: '#cef1e1',
        tagHoverBorder: '#9fdfc5',

        removeText: '#2f9678',
        removeHoverBackground: '#b8ead4',
        removeHoverText: '#087f5b',

        radius: '1rem',
        tagRadius: '1rem',

        shadow:
            '0 1px 3px rgba(16, 185, 129, 0.08)',
        focusShadow:
            '0 0 0 3px rgba(16, 185, 129, 0.14)',
    },

    corporate: {
        background: '#ffffff',
        backgroundHover: '#ffffff',

        border: '#cbd5e1',
        borderFocus: '#1d4ed8',
        ring: 'rgba(29, 78, 216, 0.12)',

        text: '#0f172a',
        placeholder: '#94a3b8',
        mutedText: '#94a3b8',

        tagBackground: '#eff6ff',
        tagBorder: '#bfdbfe',
        tagText: '#1d4ed8',
        tagHoverBackground: '#dbeafe',
        tagHoverBorder: '#93c5fd',

        removeText: '#64748b',
        removeHoverBackground: '#dbeafe',
        removeHoverText: '#1d4ed8',

        radius: '1rem',
        tagRadius: '1rem',

        shadow:
            '0 1px 2px rgba(15, 23, 42, 0.04)',
        focusShadow:
            '0 0 0 3px rgba(29, 78, 216, 0.12)',
    },

    retro: {
        background: '#fdf6e3',
        backgroundHover: '#fffaf0',

        border: '#b8a27a',
        borderFocus: '#9f1239',
        ring: 'rgba(159, 18, 57, 0.14)',

        text: '#3f2f23',
        placeholder: '#9b8b73',
        mutedText: '#9b8b73',

        tagBackground: '#f4d8a8',
        tagBorder: '#d9b77a',
        tagText: '#5c3b16',
        tagHoverBackground: '#efd09a',
        tagHoverBorder: '#cda967',

        removeText: '#8b5e34',
        removeHoverBackground: '#e7bf7e',
        removeHoverText: '#5c3b16',

        radius: '1rem',
        tagRadius: '1rem',

        shadow:
            '2px 2px 0 rgba(63, 47, 35, 0.12)',
        focusShadow:
            '0 0 0 3px rgba(159, 18, 57, 0.14)',
    },

    dracula: {
        background: '#282a36',
        backgroundHover: '#2d2f3b',

        border: '#44475a',
        borderFocus: '#bd93f9',
        ring: 'rgba(189, 147, 249, 0.18)',

        text: '#f8f8f2',
        placeholder: '#6272a4',
        mutedText: '#6272a4',

        tagBackground: '#44475a',
        tagBorder: '#6272a4',
        tagText: '#f8f8f2',
        tagHoverBackground: '#4f5266',
        tagHoverBorder: '#bd93f9',

        removeText: '#bd93f9',
        removeHoverBackground: '#6272a4',
        removeHoverText: '#f8f8f2',

        radius: '1rem',
        tagRadius: '1rem',

        shadow:
            '0 2px 8px rgba(0, 0, 0, 0.30)',
        focusShadow:
            '0 0 0 3px rgba(189, 147, 249, 0.18)',
    },
}

function createThemeStyle(
    theme: ThemeVariables,
): CSSProperties {
    return {
        '--pti-background': theme.background,
        '--pti-background-hover': theme.backgroundHover,

        '--pti-border': theme.border,
        '--pti-border-focus': theme.borderFocus,
        '--pti-ring': theme.ring,

        '--pti-text': theme.text,
        '--pti-placeholder': theme.placeholder,
        '--pti-muted-text': theme.mutedText,

        '--pti-tag-background': theme.tagBackground,
        '--pti-tag-border': theme.tagBorder,
        '--pti-tag-text': theme.tagText,
        '--pti-tag-hover-background':
            theme.tagHoverBackground,
        '--pti-tag-hover-border':
            theme.tagHoverBorder,

        '--pti-remove-text': theme.removeText,
        '--pti-remove-hover-background':
            theme.removeHoverBackground,
        '--pti-remove-hover-text':
            theme.removeHoverText,

        '--pti-radius': theme.radius,
        '--pti-tag-radius': theme.tagRadius,

        '--pti-shadow': theme.shadow,
        '--pti-focus-shadow': theme.focusShadow,
    } as CSSProperties
}

const themeStyles: Record<
    SimpleTagInputTheme,
    CSSProperties
> = {
    default: createThemeStyle(themes.default),
    light: createThemeStyle(themes.light),
    dark: createThemeStyle(themes.dark),
    cupcake: createThemeStyle(themes.cupcake),
    emerald: createThemeStyle(themes.emerald),
    corporate: createThemeStyle(themes.corporate),
    retro: createThemeStyle(themes.retro),
    dracula: createThemeStyle(themes.dracula),
}

function TagIcon(props: IconProps) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            aria-hidden='true'
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.59 13.41 13.41 20.59a2 2 0 0 1-2.82 0L3.41 13.41a2 2 0 0 1 0-2.82L10.59 3a2 2 0 0 1 1.41-.59H19a2 2 0 0 1 2 2v7a2 2 0 0 1-.59 1.41Z'
            />

            <circle
                cx='16'
                cy='8'
                r='1'
                fill='currentColor'
                stroke='none'
            />
        </svg>
    )
}

function RemoveIcon(props: IconProps) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            aria-hidden='true'
            {...props}
        >
            <path
                strokeLinecap='round'
                d='M6 6 18 18M18 6 6 18'
            />
        </svg>
    )
}

function ClearIcon(props: IconProps) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            aria-hidden='true'
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m6 6 12 12M18 6 6 18'
            />
        </svg>
    )
}

type TagListProps = Pick<
    SimpleTagInputProps,
    | 'value'
    | 'onChange'
    | 'tagIcon'
    | 'removeIcon'
    | 'onTagRemove'
    | 'removeButtonProps'
> & {
    disabled?: boolean
    readOnly?: boolean
}

const TagList = memo(function TagList({
    value,
    onChange,
    tagIcon,
    removeIcon,
    onTagRemove,
    removeButtonProps,
    disabled = false,
    readOnly = false,
}: TagListProps) {
    const removeTag = (index: number) => {
        const tag = value[index]

        if (tag === undefined) {
            return
        }

        onChange([
            ...value.slice(0, index),
            ...value.slice(index + 1),
        ])

        onTagRemove?.(tag, index)
    }

    return (
        <>
            {value.map((tag, index) => (
                <span
                    key={`${tag}-${index}`}
                    className='taglite-tag'
                >
                    {tagIcon ?? (
                        <TagIcon className='taglite-tag-icon' />
                    )}

                    <span className='taglite-tag-label'>
                        {tag}
                    </span>

                    <button
                        type='button'
                        aria-label={
                            removeButtonProps?.['aria-label'] ??
                            `Remove tag ${tag}`
                        }
                        {...removeButtonProps}
                        disabled={
                            disabled || readOnly
                        }
                        onClick={event => {
                            event.stopPropagation()
                            removeTag(index)
                        }}
                        className={`taglite-remove-button ${removeButtonProps?.className ?? ''}`}
                    >
                        {removeIcon ?? (
                            <RemoveIcon className='taglite-remove-icon' />
                        )}
                    </button>
                </span>
            ))}
        </>
    )
})

const DEFAULT_SEPARATORS = [
    'Enter',
    ',',
]

const PASTE_SEPARATOR_MAP: Record<
    string,
    string
> = {
    Enter: '\n',
    Tab: '\t',
    Space: ' ',
}

const escapeRegExp = (
    value: string,
): string =>
    value.replace(
        /[.*+?^${}()|[\]\\-]/g,
        '\\$&',
    )

const getPasteDelimiters = (
    separators: string[],
): string[] => {
    const delimiters = new Set<string>([
        ',',
        '\n',
        '\r',
    ])

    for (const separator of separators) {
        if (separator.length === 1) {
            delimiters.add(separator)
            continue
        }

        const mappedSeparator =
            PASTE_SEPARATOR_MAP[separator]

        if (mappedSeparator) {
            delimiters.add(mappedSeparator)
        }
    }

    return [...delimiters]
}

type ParsedPaste = {
    tags: string[]
    hasSeparator: boolean
}

const splitPastedTags = (
    text: string,
    separators: string[],
): ParsedPaste => {
    const delimiters =
        getPasteDelimiters(separators)

    const pattern = delimiters
        .map(escapeRegExp)
        .join('|')

    const separatorRegex =
        new RegExp(pattern)

    return {
        tags: text
            .split(separatorRegex)
            .map(tag => tag.trim())
            .filter(Boolean),

        hasSeparator: separatorRegex.test(text),
    }
}

type ProcessResult = {
    tags: string[]
    addedTags: string[]
}

export default forwardRef<
    HTMLInputElement,
    SimpleTagInputProps
>(function SimpleTagInput(
    {
        className = '',

        placeholder = 'Add a new tag...',
        hintText = 'Press Enter to add a tag',

        value,
        onChange,

        direction = 'ltr',
        theme = 'light',

        tagIcon,
        removeIcon,
        clearIcon,

        separators = DEFAULT_SEPARATORS,
        maxTags,
        allowDuplicates = false,

        normalizeTag,
        validateTag,

        onInvalidTag,
        onTagAdd,
        onTagRemove,

        acceptOnBlur = false,

        clearable = false,
        onClear,

        removeButtonProps,

        disabled = false,
        readOnly = false,

        onKeyDown: inputOnKeyDown,
        onBlur: inputOnBlur,
        onPaste: inputOnPaste,

        ...inputProps
    },
    forwardedRef,
) {
    const [inputValue, setInputValue] =
        useState('')

    const inputRef =
        useRef<HTMLInputElement>(null)

    const hasReachedMaxTags =
        maxTags !== undefined &&
        maxTags <= value.length

    const separatorsSet =
        new Set(separators)

    const setInputNode = (
        node: HTMLInputElement | null,
    ) => {
        inputRef.current = node

        if (
            typeof forwardedRef === 'function'
        ) {
            forwardedRef(node)
        } else if (forwardedRef) {
            forwardedRef.current = node
        }
    }

    const normalize = (tag: string) =>
        (
            normalizeTag
                ? normalizeTag(tag)
                : tag
        ).trim()

    const addTags = (
        rawTags: string[],
        clearInput = true,
    ): ProcessResult => {
        if (
            disabled ||
            readOnly ||
            hasReachedMaxTags
        ) {
            if (clearInput) {
                setInputValue('')
            }

            return {
                tags: value,
                addedTags: [],
            }
        }

        const nextTags = [...value]
        const addedTags: string[] = []

        const existingTags = normalizeTag
            ? new Set(
                value.map(tag => normalize(tag)),
            )
            : new Set(value)

        for (const rawTag of rawTags) {
            if (
                maxTags !== undefined &&
                nextTags.length >= maxTags
            ) {
                break
            }

            const normalizedTag =
                normalize(rawTag)

            if (!normalizedTag) {
                continue
            }

            if (validateTag) {
                const validationResult =
                    validateTag(normalizedTag)

                if (
                    validationResult !== true
                ) {
                    onInvalidTag?.(
                        normalizedTag,
                        typeof validationResult ===
                            'string'
                            ? validationResult
                            : undefined,
                    )

                    continue
                }
            }

            if (
                !allowDuplicates &&
                existingTags.has(normalizedTag)
            ) {
                continue
            }

            nextTags.push(normalizedTag)
            addedTags.push(normalizedTag)
            existingTags.add(normalizedTag)
        }

        if (addedTags.length > 0) {
            const startIndex = value.length

            onChange(nextTags)

            for (
                let index = 0;
                index < addedTags.length;
                index++
            ) {
                onTagAdd?.(
                    addedTags[index],
                    startIndex + index,
                )
            }
        }

        if (clearInput) {
            setInputValue('')
        }

        return {
            tags: nextTags,
            addedTags,
        }
    }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        setInputValue(event.target.value)
    }

    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (
            !disabled &&
            !readOnly &&
            separatorsSet.has(event.key)
        ) {
            event.preventDefault()

            addTags([inputValue])
            inputOnKeyDown?.(event)

            return
        }

        if (
            !disabled &&
            !readOnly &&
            event.key === 'Backspace' &&
            !inputValue &&
            value.length > 0
        ) {
            const index = value.length - 1
            const tag = value[index]

            event.preventDefault()

            onChange(value.slice(0, -1))
            onTagRemove?.(tag, index)

            inputOnKeyDown?.(event)

            return
        }

        inputOnKeyDown?.(event)
    }

    const handlePaste = (
        event: ClipboardEvent<HTMLInputElement>,
    ) => {
        if (
            !disabled &&
            !readOnly
        ) {
            const text =
                event.clipboardData.getData('text')

            const {
                tags,
                hasSeparator,
            } = splitPastedTags(
                text,
                separators,
            )

            if (hasSeparator) {
                event.preventDefault()
                addTags(tags)
            }
        }

        inputOnPaste?.(event)
    }

    const handleBlur = (
        event: FocusEvent<HTMLInputElement>,
    ) => {
        if (
            acceptOnBlur &&
            !disabled &&
            !readOnly &&
            inputValue.trim()
        ) {
            addTags([inputValue])
        }

        inputOnBlur?.(event)
    }

    const clearTags = () => {
        if (
            disabled ||
            readOnly ||
            value.length === 0
        ) {
            return
        }

        onChange([])
        onClear?.()
        setInputValue('')
        inputRef.current?.focus()
    }

    const handleRootClick = () => {
        if (disabled) {
            return
        }

        inputRef.current?.focus()
    }

    return (
        <div
            dir={direction}
            style={themeStyles[theme]}
            className={`taglite-root ${disabled ? 'taglite-root--disabled' : ''} ${className}`}
            onClick={handleRootClick}
        >
            {/* Liquid light */}
            <span
                aria-hidden='true'
                className='taglite-liquid-light'
                style={{
                    transform:
                        'translate(-50%, -50%)',
                }}
            />

            <div className='taglite-content'>
                <TagList
                    value={value}
                    onChange={onChange}
                    tagIcon={tagIcon}
                    removeIcon={removeIcon}
                    onTagRemove={onTagRemove}
                    removeButtonProps={
                        removeButtonProps
                    }
                    disabled={disabled}
                    readOnly={readOnly}
                />

                <input
                    ref={setInputNode}
                    type='text'
                    value={inputValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onBlur={handleBlur}
                    className='taglite-input'
                    {...inputProps}
                />
            </div>

            {clearable &&
                value.length > 0 && (
                    <button
                        type='button'
                        aria-label='Clear all tags'
                        disabled={
                            disabled || readOnly
                        }
                        onClick={event => {
                            event.stopPropagation()
                            clearTags()
                        }}
                        className='taglite-clear-button'
                    >
                        {clearIcon ?? (
                            <ClearIcon className='taglite-clear-icon' />
                        )}
                    </button>
                )}

            <div
                className='taglite-hint'
            >
                {hintText}
            </div>
        </div>
    )
})
