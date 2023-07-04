var documenterSearchIndex = {"docs":
[{"location":"#TrigPolys","page":"Introduction","title":"TrigPolys","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"TrigPolys.jl is a package for fast manipulation of trigonometric polynomials.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"A Hermitian trigonometric polynomial can be viewed as a polynomial R(z) \\\\in \\\\mathbb{C}[z] [D17, (1.7)]:","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"R(z) = a_0 + frac12 sum_k=1^n a_k z^-k + a_k^* z^k","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"On the unit circle, this becomes [D17, (1.8)]:","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"R(omega) = a_0 + sum_k=1^n a_ck cos(komega) + a_sk sin(komega)","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"where a_ck is ac[k] and a_sk is as[k].","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"[D17] ...","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"The polynomial p(x) can be represented either by 2n+1 coefficients a_k or by evaluations at 2n+1 distinct points in the interval 02pi). Each representation is useful in different situations: the coefficient representation is useful for truncating or increasing the degree of a polynomial whereas the evaluation representation is useful for adding and multiplying polynomials.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"This package provides the functions evaluate and interpolate to convert efficiently between these two representations. These operations are implemented via the Fast Fourier Transform (FFT) provided by the FFTW.jl library.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"For example, multiplying two trigonometric polynomials is implemented with the following code:","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"function Base.:*(p1::TrigPoly, p2::TrigPoly)\n    n = p1.n + p2.n\n    interpolate(evaluate(pad_to(p1, n)) .* evaluate(pad_to(p2, n)))\nend","category":"page"},{"location":"#Construction-and-Convertion","page":"Introduction","title":"Construction and Convertion","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"TrigPolys.TrigPoly\nTrigPolys.TrigPoly(a::Number)\nTrigPolys.TrigPoly(u::AbstractVector{T}) where {T<:AbstractFloat}\nTrigPolys.a0\nTrigPolys.ac\nTrigPolys.as\nTrigPolys.n\nTrigPolys.degree","category":"page"},{"location":"#TrigPolys.TrigPoly","page":"Introduction","title":"TrigPolys.TrigPoly","text":"struct TrigPoly{T<:AbstractFloat, VT<:AbstractVector{T}}\n    a0::T    # Constant coefficient\n    ac::VT   # cos coefficients\n    as::VT   # sin coefficients\nend\n\nRepresents a Hermitian trigonometric polynomial by its coefficients. The vectors ac and as should have the same length, that we call n in this docstring. This represent the following function\n\nR(ω) = a0 + sum(ac[k] * cos(k * ω) + as[k] * sin(k * ω) for k in 1:n)\n\nwhich is a polynomial in the variable x = cos(ω).\n\n\n\n\n\n","category":"type"},{"location":"#TrigPolys.TrigPoly-Tuple{Number}","page":"Introduction","title":"TrigPolys.TrigPoly","text":"(p::TrigPoly)(x::Number)\n\nEvaluate p(x) at a single point. See TrigPolys.evaluate for faster evaluation for special points on the unit circle.\n\n\n\n\n\n","category":"method"},{"location":"#TrigPolys.TrigPoly-Union{Tuple{AbstractVector{T}}, Tuple{T}} where T<:AbstractFloat","page":"Introduction","title":"TrigPolys.TrigPoly","text":"TrigPoly(u::AbstractVector{T}) where {T<:AbstractFloat}\n\nConstructs a TrigPoly given a vector of coefficients of length 2n+1. The first entry of u is a0, the next n entries are ac and the last n entries are as.\n\n\n\n\n\n","category":"method"},{"location":"#TrigPolys.a0","page":"Introduction","title":"TrigPolys.a0","text":"a0(p::TrigPoly)\n\nEquivalent to p.a0, used for incorporation into automatic differentiation libraries.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.ac","page":"Introduction","title":"TrigPolys.ac","text":"ac(p::TrigPoly)\n\nEquivalent to p.ac, used for incorporation into automatic differentiation libraries.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.as","page":"Introduction","title":"TrigPolys.as","text":"as(p::TrigPoly)\n\nEquivalent to p.as, used for incorporation into automatic differentiation libraries.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.n","page":"Introduction","title":"TrigPolys.n","text":"n(p::TrigPoly)\n\nEquivalent to p.n. Returns the length of cosine/sine coefficients, which is length(p.ac) == length(p.as).\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.degree","page":"Introduction","title":"TrigPolys.degree","text":"degree(p::TrigPoly)\n\nReturns the number of coefficients of p, which is 2*p.n + 1.\n\n\n\n\n\n","category":"function"},{"location":"#Methods","page":"Introduction","title":"Methods","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Base.vec(p::TrigPoly)\nBase.:(==)(p1::TrigPoly, p2::TrigPoly)\nBase.:+(p1::TrigPoly, p2::TrigPoly)\nBase.:*(p1::TrigPoly, p2::TrigPoly)\nBase.:/(p::TrigPoly, a::Number)","category":"page"},{"location":"#Base.vec-Tuple{TrigPoly}","page":"Introduction","title":"Base.vec","text":"Base.vec(p::TrigPoly)\n\nConverts a TrigPoly into a vector, inverse operation of TrigPolys.TrigPoly\n\n\n\n\n\n","category":"method"},{"location":"#Base.:==-Tuple{TrigPoly, TrigPoly}","page":"Introduction","title":"Base.:==","text":"Base.:(==)(p1::TrigPoly, p2::TrigPoly)\n\nReturns true if the coefficients of p1 and p2 are all equal.\n\n\n\n\n\n","category":"method"},{"location":"#Base.:+-Tuple{TrigPoly, TrigPoly}","page":"Introduction","title":"Base.:+","text":"Base.:+(p1::TrigPoly, p2::TrigPoly)\n\nAdds p1 to p2. The degree of the resulting polynomial will be the maximum degree of p1 and p2: (p1 + p2).n == max(p1.n, p2.n)\n\n\n\n\n\n","category":"method"},{"location":"#Base.:*-Tuple{TrigPoly, TrigPoly}","page":"Introduction","title":"Base.:*","text":"Base.:*(p1::TrigPoly, p2::TrigPoly)\n\nMultiplies p1 and p2. The degree of the resulting polynomial will be the sum of degrees of p1 and p2: (p1 * p2).n == p1.n + p2.n\n\n\n\n\n\n","category":"method"},{"location":"#Base.:/-Tuple{TrigPoly, Number}","page":"Introduction","title":"Base.:/","text":"Base.:/(p::TrigPoly, a::Number)\n\nDivides p by a scalar.\n\n\n\n\n\n","category":"method"},{"location":"#Functions","page":"Introduction","title":"Functions","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"TrigPolys.pad_to\nTrigPolys.pad_by\nTrigPolys.random_trig_poly\nTrigPolys.basis\nTrigPolys.evaluate\nTrigPolys.evaluateT\nTrigPolys.interpolatev\nTrigPolys.interpolate","category":"page"},{"location":"#TrigPolys.pad_to","page":"Introduction","title":"TrigPolys.pad_to","text":"pad_to(p::TrigPoly{T,VT}, n::Integer) where {T<:AbstractFloat, VT<:AbstractVector{T}}\n\nIncrease the length of p.ac and p.as to n, padding with zeros if necessary. n cannot be smaller than p.n.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.pad_by","page":"Introduction","title":"TrigPolys.pad_by","text":"pad_by(p::TrigPoly, n::Integer)\n\nIncrease the length of p.ac and p.as by n, padding with n zeros.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.random_trig_poly","page":"Introduction","title":"TrigPolys.random_trig_poly","text":"random_trig_poly(n)\n\nGenerate a TrigPoly with random coefficients.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.basis","page":"Introduction","title":"TrigPolys.basis","text":"basis(n, x)\n\nGenerate the basis for TrigPoly expressed as a vector, so that basis(p.n, x)'*vec(p) = p(x).\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.evaluate","page":"Introduction","title":"TrigPolys.evaluate","text":"evaluate(u::AbstractVector)\n\nEvaluates an array representation of p::TrigPoly, returned by vec(p).\n\n\n\n\n\nevaluate(p::TrigPoly)\n\nEvaluates p on degree(p) uniformly-spaced points on the circle. See here for more details.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.evaluateT","page":"Introduction","title":"TrigPolys.evaluateT","text":"evaluateT(u::AbstractVector)\n\nAdjoint of evaluate operator on an array representation of p::TrigPoly , returned by vec(p).\n\n\n\n\n\nevaluateT(p::TrigPoly)\n\nAdjoint of evaluate operator. Returns a vector.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.interpolatev","page":"Introduction","title":"TrigPolys.interpolatev","text":"interpolatev(u::Vector)\n\nInverse of TrigPolys.evaluate(p::AbstractVector). Returns a vector.\n\n\n\n\n\n","category":"function"},{"location":"#TrigPolys.interpolate","page":"Introduction","title":"TrigPolys.interpolate","text":"interpolate(u::Vector)\n\nInverse of TrigPolys.evaluate(p::TrigPoly). Returns a TrigPoly.\n\n\n\n\n\n","category":"function"}]
}
